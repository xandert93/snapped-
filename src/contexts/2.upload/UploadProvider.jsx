import { useEffect, useRef } from 'react';
import { uploadContext } from './uploadContext';
import { useDispatch } from 'react-redux';
import { setDataURL } from '../../state/upload/actions';

const UploadProvider = ({ children }) => {
  const readerRef = useRef(new FileReader());

  const dispatch = useDispatch();

  useEffect(() => {
    readerRef.current.onload = (e) => dispatch(setDataURL(e.target.result));
  }, [readerRef]);

  return (
    <uploadContext.Provider value={readerRef.current}>
      {children}
    </uploadContext.Provider>
  );
};

export default UploadProvider;
