import React, { useEffect, useReducer, useRef, useCallback } from 'react';
import { uploadContext } from './uploadContext';
import { uploadReducer, defaultState } from './uploadReducer';
import {
  SET_FILE_SUCCESS,
  SET_FILE_FAIL,
  RESET_FORM,
  SET_DATA_URL,
  SET_POST_DESCRIPTION,
  SET_CONFIRMED_FILE,
} from './actions';

const UploadProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uploadReducer, defaultState);
  const readerRef = useRef(new FileReader());

  useEffect(() => {
    readerRef.current.onload = setDataURL;
  }, [readerRef]);

  const validateFile = useCallback(
    (selectedFile) => {
      if (selectedFile) {
        if (['image/png', 'image/jpeg'].includes(selectedFile.type)) {
          dispatch({ type: SET_FILE_SUCCESS, payload: selectedFile });
          readerRef.current.readAsDataURL(selectedFile);
          return;
        } else {
          return dispatch({ type: SET_FILE_FAIL });
        }
      } else return;
    },
    [dispatch, readerRef]
  );

  const setDataURL = useCallback(
    (e) => dispatch({ type: SET_DATA_URL, payload: e.target.result }),
    [dispatch]
  );

  const resetForm = useCallback(
    () => dispatch({ type: RESET_FORM }),
    [dispatch]
  );

  const setPostDescription = useCallback(
    (description) =>
      dispatch({ type: SET_POST_DESCRIPTION, payload: description }),
    [dispatch]
  );
  const setConfirmedFile = useCallback(
    (file) => dispatch({ type: SET_CONFIRMED_FILE, payload: file }),
    [dispatch]
  );

  return (
    <uploadContext.Provider
      value={{
        ...state,
        validateFile,
        setDataURL,
        resetForm,
        setPostDescription,
        setConfirmedFile,
      }}>
      {children}
    </uploadContext.Provider>
  );
};

export default UploadProvider;
