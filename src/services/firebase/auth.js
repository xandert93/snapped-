import { auth } from '../../lib/firebase/config';

//all asynchronous
export const fbRegister = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

export const fbLogin = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const fbLogout = async () => await auth.signOut(); //directly called from frontend

export const fbResetPassword = (email) => auth.sendPasswordResetEmail(email);
