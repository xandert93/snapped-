import { auth } from '../../lib/firebase/config';

export const register = async (
  email,
  password,
  username,
  fullName,
  signUpNamesRef
) => {
  signUpNamesRef.current = [username, fullName]; //must happen first!
  await auth.createUserWithEmailAndPassword(email, password);
};

export const login = async (email, password) =>
  await auth.signInWithEmailAndPassword(email, password);

export const logout = async () => await auth.signOut();

export const resetPassword = (email) => auth.sendPasswordResetEmail(email);
