import React, { useReducer } from 'react';
import { uploadFormContext, initialState } from './uploadFormActions';
import uploadFormReducer from './uploadFormReducer';

const UploadFormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(uploadFormReducer, initialState);

  return (
    <uploadFormContext.Provider value={{ ...state }}>
      {children}
    </uploadFormContext.Provider>
  );
};

export default UploadFormProvider;
