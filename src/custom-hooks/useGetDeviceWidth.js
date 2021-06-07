import { useState, useEffect } from 'react';

export const useGetDeviceWidth = () => {
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    window.onresize = () => {
      setInnerWidth(window.innerWidth);
    };
  }, []);

  return innerWidth;
};
