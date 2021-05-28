import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase/config';

const useAuthListener = () => {
  const [isCheckingUser, setIsCheckingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setTimeout(setIsCheckingUser, 1200, false);
    });

    return unsubscribe;
  }, []);

  return [isCheckingUser, currentUser];
};

export { useAuthListener };
