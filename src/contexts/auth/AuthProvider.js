import { CircularProgress } from '@material-ui/core';
import { useCallback } from 'react';
// import { useHistory } from 'react-router-dom';
import { auth } from '../../lib/firebase/config';
import { addUserToDb } from '../../services/firebase';
import { useAuthListener, useGetCurrentUserDoc } from '../../custom-hooks';
import authContext from './authContext';

const AuthProvider = ({ children }) => {
  const [isCheckingUser, currentUser] = useAuthListener(null);
  const [currentUserDoc, setCurrentUserDoc] = useGetCurrentUserDoc(currentUser);
  //^initially called with null. Once currentUser state updates, its useEffect reruns
  //setCurrentUserDoc needed for update profile page

  // const history = useHistory();

  const register = async (email, password, username, fullName) => {
    const credTok = await auth.createUserWithEmailAndPassword(email, password);
    await addUserToDb(credTok, username, fullName);
    // history.push('/');
  };

  const login = useCallback(async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
    // history.push('/');
  }, []);

  const resetPassword = useCallback(
    (email) => auth.sendPasswordResetEmail(email),
    []
  );

  const updateEmail = (email) => currentUser.updateEmail(email);
  const updatePassword = (password) => currentUser.updatePassword(password);
  // const updateProfileData = (obj) => currentUser.updateProfile(obj);

  const logout = useCallback(async () => {
    await auth.signOut();
    // history.push('/auth/login');
  });

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
        // updateProfileData,
        logout,
      }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

//everything works without history.push!
