import { CircularProgress } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { auth } from '../../firebase/config';
import authContext from './authContext';

const AuthProvider = ({ children }) => {
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  const { push } = useHistory();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setTimeout(setIsCheckingUser, 1200, false);
    });
    return unsubscribe;
  }, []);

  const register = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);

  const login = useCallback(
    (email, password) => auth.signInWithEmailAndPassword(email, password),
    []
  );
  const resetPassword = useCallback(
    (email) => auth.sendPasswordResetEmail(email),
    []
  );

  const updateEmail = (email) => currentUser.updateEmail(email);
  const updatePassword = (password) => currentUser.updatePassword(password);
  const updateProfileData = (obj) => currentUser.updateProfile(obj);

  // const login = useCallback(async (email, password) => {
  //   try {
  //     await auth.signInWithEmailAndPassword(email, password);
  //     push('/');
  //   } catch (err) {}
  // });

  const logout = useCallback(async () => {
    try {
      await auth.signOut();
      push('/auth/login');
    } catch (err) {}
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
        currentUser,
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
