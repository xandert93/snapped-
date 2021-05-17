import React, { useRef, useState } from 'react';

const useForm = () => {
  const [msgData, setMsgData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  return {
    msgData,
    setMsgData,
    isSubmitting,
    setIsSubmitting,
    refs: {
      usernameRef,
      emailRef,
      passwordRef,
      passwordConfirmRef,
    },
  };
};

export default useForm;
