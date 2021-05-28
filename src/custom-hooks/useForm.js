import { useRef, useState } from 'react';

const useForm = () => {
  const [msgData, setMsgData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameRef = useRef();
  const fullNameRef = useRef();
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
      fullNameRef,
      emailRef,
      passwordRef,
      passwordConfirmRef,
    },
  };
};

export { useForm };
