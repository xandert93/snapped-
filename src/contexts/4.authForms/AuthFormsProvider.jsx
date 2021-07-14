import { authFormsContext } from './authFormsContext';
import { useCallback, useContext, useEffect } from 'react';
import { authContext } from '../../contexts/1.auth/authContext';

import { checkUsernameTaken } from '../../services/firebase/firestore';

import { useState } from 'react';
import { login, register, resetPassword } from '../../services/firebase/auth';

const defaultUserDetails = {
  fullName: '',
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const AuthFormsProvider = ({ pageName, children }) => {
  const { signUpNamesRef } = useContext(authContext);

  const [msgData, setMsgData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [
    { fullName, username, email, password, passwordConfirm },
    setUserDetails,
  ] = useState(defaultUserDetails);

  const changeHandler = (e) =>
    setUserDetails((x) => ({ ...x, [e.target.name]: e.target.value }));

  const resetFields = () => {
    setMsgData(null);
    setIsSubmitting(false);
    setUserDetails(defaultUserDetails);
  };

  useEffect(resetFields, [pageName]);

  const submitHandler = (e) => {
    e.preventDefault();
    setMsgData(null);
    setIsSubmitting(true);

    if (pageName === 'register') attemptRegister();
    if (pageName === 'login') attemptLogin();
    if (pageName === 'password-reset') attemptPasswordReset();
  };

  const attemptRegister = async () => {
    if (username.length < 4) {
      setIsSubmitting(false);
      return setMsgData({
        success: false,
        msg: 'Username must be at least 5 characters.',
      });
    }

    if (password !== passwordConfirm) {
      setIsSubmitting(false);
      return setMsgData({ success: false, msg: 'Passwords do not match.' });
    }

    //Wouldn't allow 3 word names
    // if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(fullName)) {
    //   setIsSubmitting(false);
    //   return setMsgData({ success: false, msg: 'Please enter a valid name.' });
    // }

    if (await checkUsernameTaken(username)) {
      setIsSubmitting(false);
      return setMsgData({
        success: false,
        msg: 'That username is already taken.',
      });
    }

    try {
      await register(email, password, username, fullName, signUpNamesRef);
    } catch (err) {
      setIsSubmitting(false);
      return setMsgData({ success: false, msg: err.message });
    }
  };

  const attemptLogin = async () => {
    try {
      await login(email, password);
    } catch (err) {
      setIsSubmitting(false);
      setMsgData({ success: false, msg: err.message });
    }
  };

  const attemptPasswordReset = async () => {
    try {
      await resetPassword(email);
      setMsgData({
        success: true,
        msg: 'Please check your inbox for further instructions.',
      });
    } catch (err) {
      setIsSubmitting(false);
      return setMsgData({
        success: false,
        msg: 'This email address is not on our database.',
      });
    }
  };

  return (
    <authFormsContext.Provider
      value={{
        fullName,
        username,
        email,
        password,
        passwordConfirm,
        changeHandler,
        msgData,
        isSubmitting,
        submitHandler,
      }}>
      {children}
    </authFormsContext.Provider>
  );
};

export default AuthFormsProvider;
