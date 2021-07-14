import { CircularProgress } from '@material-ui/core';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../lib/firebase/config';
import { authenticateUserRecord } from '../../state/auth/actions';
import { authContext } from './authContext';

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isCheckingUser = useSelector((state) => state.auth.isCheckingUser);

  const signUpNamesRef = useRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userRecord) =>
      dispatch(authenticateUserRecord(userRecord, signUpNamesRef.current))
    );
    return unsubscribe;
  }, []);

  if (isCheckingUser)
    return (
      <div style={{ height: 'calc(100vh - 16px)', display: 'flex' }}>
        <CircularProgress
          disableShrink
          size="10rem"
          style={{
            margin: 'auto',
          }}
        />
      </div>
    );
  else
    return (
      <authContext.Provider value={{ signUpNamesRef }}>
        {children}
      </authContext.Provider>
    );
};

export default AuthProvider;

//everything works without history.push!...

//UNDERSTANDING USER REGISTRATION (read this first!)
/*
When user submits registration, we capture 4 inputs. Because of the shit way FB works (more soon),
we must first store any non FB Auth essential data on a ref. We then run FB Auth's registration
method. As soon as this is successful, sadly, "onAuthStateChanged" runs. Unstoppable.

The FB Auth user will be set to state. If the user doesn't have a "displayName" this tells us
that they have just registed. Thus, we update their profile with the passed username. Once complete, 
we create a userDoc on the FB FS. Once complete, we get this userDoc from the FB FS and it will
be set to state on the next re-render.

If the FB Auth user already had a "displayName", this tells us that they are a returning user
and that we should plainly get their userDoc.

//UNDERSTANDING INITIAL USEFFECT HOOK
/*
When loading spinner has rendered, useEffect runs. "onAuthStateChanged" will run (always runs
initially) with "null" getting passed into it i.e. no authenticated user (yet!). The firebaseAuthUser
and user are both set to null to reflect this. 

1.2s passes, "isChecking" is set to false. AuthProvider re-renders, and alternate render statement
runs, invoking <App/> with a "null" user. <App/> sees this and renders out the 
authentication page. 

Now, when a user logs in (or signs up), "onAuthStateChanged" runs, but this time with the 
FB Auth user (contains very basic info, sadly). We set the firebaseAuthUser to it and we then, using
their unique "displayName", fetch the FB Auth user's userDoc from FB FS. This is then set to 
user. Again, AuthProvider re-renders, but this time <App/> receives a valid 
user. <App/> re-renders and since the user is currently on <PublicRoute /> whilst
authenticated, they are immediately <Redirect to="/">. This stipulates a <ProtectedRoute />
and the user is successfully sent to the home page. 

Now, when a user signs out, we must reset user. This ensures that the 
whole <App/> re-renders and that if user is on <ProtectedRoute/> at time of signout, then they 
will immediately <Redirect to="/auth/login"/> :). 

This is why we must also pre-emptively set the user to "null" in the useEffect. 

P.S. aside from allowing us to fetch the more useful userDoc from the FB FS, we may think that 
there is no need to store the basic FB Auth user in state. However, as we should notice
it needs to be persisted if, on the "MyAccount" page, the user wishes to update their FB Auth
user credentials. The FB Auth user contains the vital methods for this i.e.:

                  ".updateEmail() || .updatePassword() || updateProfile()". 
*/
