import { useEffect, useRef, useState } from 'react';

const useFileReader = () => {
  const readerRef = useRef(new FileReader());
  const [dataURL, setDataURL] = useState('');
  useEffect(() => {
    readerRef.current.onload = (e) => setDataURL(e.target.result);
  }, []);

  return [readerRef, dataURL, setDataURL];
};

export { useFileReader };
