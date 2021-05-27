import { useState, useEffect } from 'react';

const useGetDeviceWidth = () => {
  const [innerWidth, setInnerWidth] = useState(0);
  useEffect(() => {
    setInnerWidth(window.innerWidth);
    window.onresize = () => {
      setInnerWidth(window.innerWidth);
    };
  }, []);

  return innerWidth;
};

export default useGetDeviceWidth;
