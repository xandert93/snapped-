import { CircularProgress } from '@material-ui/core';
import { useState, useEffect, useCallback, useRef } from 'react';
import { auth } from '../../lib/firebase/config';
import { addUserToDb, getUserDocFromDb } from '../../services/firebase';
import authContext from './authContext';

const AuthProvider = ({ children }) => {
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); //FB Auth user
  const [currentUserDoc, setCurrentUserDoc] = useState(null); //FB FS userDoc

  const signUpNames = useRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);

      if (user) {
        if (!user.displayName) {
          const [username, fullName] = signUpNames.current;
          await user.updateProfile({ displayName: username }); //*see notes
          await addUserToDb(user, username, fullName);
        }
        setCurrentUserDoc(await getUserDocFromDb(user.uid));
      }

      if (!user) setCurrentUserDoc(null);

      setIsCheckingUser(false);
    });

    return unsubscribe;
  }, []);

  const register = useCallback(async (email, password, username, fullName) => {
    signUpNames.current = [username, fullName]; //must happen first!
    await auth.createUserWithEmailAndPassword(email, password);
    // history.push('/');
  }, []);

  const login = useCallback(async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
    // history.push('/');
  }, []);

  const logout = useCallback(async () => {
    await auth.signOut();
    // history.push('/auth/login');
  });

  const resetPassword = useCallback(
    (email) => auth.sendPasswordResetEmail(email),
    []
  );

  const updateEmail = useCallback(
    (email) => currentUser.updateEmail(email),
    [currentUser]
  );
  const updatePassword = useCallback(
    (password) => currentUser.updatePassword(password),
    [currentUser]
  );
  const updateProfileData = useCallback(
    (obj) => currentUser.updateProfile(obj),
    [currentUser]
  );

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

  return (
    <authContext.Provider
      value={{
        currentUserDoc,
        setCurrentUserDoc,
        register,
        login,
        resetPassword,
        updateEmail,
        updatePassword,
        updateProfileData,
        logout,
      }}>
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
initially) with "null" getting passed into it i.e. no authenticated user (yet!). The currentUser
and currentUserDoc are both set to null to reflect this. 

1.2s passes, "isChecking" is set to false. AuthProvider re-renders, and alternate render statement
runs, invoking <App/> with a "null" currentUserDoc. <App/> sees this and renders out the 
authentication page. 

Now, when a user logs in (or signs up), "onAuthStateChanged" runs, but this time with the 
FB Auth user (contains very basic info, sadly). We set the currentUser to it and we then, using
their unique "displayName", fetch the FB Auth user's userDoc from FB FS. This is then set to 
currentUserDoc. Again, AuthProvider re-renders, but this time <App/> receives a valid 
currentUserDoc. <App/> re-renders and since the user is currently on <PublicRoute /> whilst
authenticated, they are immediately <Redirect to="/">. This stipulates a <ProtectedRoute />
and the user is successfully sent to the home page. 

Now, when a user signs out, we must reset currentUserDoc. This ensures that the 
whole <App/> re-renders and that if user is on <ProtectedRoute/> at time of signout, then they 
will immediately <Redirect to="/auth/login"/> :). 

This is why we must also pre-emptively set the currentUserDoc to "null" in the useEffect. 

P.S. aside from allowing us to fetch the more useful userDoc from the FB FS, we may think that 
there is no need to store the basic FB Auth user in state. However, as we should notice
it needs to be persisted if, on the "MyAccount" page, the user wishes to update their FB Auth
user credentials. The FB Auth user contains the vital methods for this i.e.:

                  ".updateEmail() || .updatePassword() || updateProfile()". 
*/
