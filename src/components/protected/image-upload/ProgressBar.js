import React, { useContext, useEffect } from 'react';
import useBucket from '../../../custom-hooks/useBucket';
import authContext from '../../../contexts/auth/authContext';
import ProgressCircle from './ProgressCircle';
import { useHistory, useLocation } from 'react-router';

const ProgressBar = ({ file, description, resetForm }) => {
  const { currentUser } = useContext(authContext);
  const { pathname } = useLocation();
  const { push } = useHistory();

  const { uploadProgress, uploadURL, uploadErrMsg } = useBucket(
    currentUser,
    file,
    description,
    'Image URL Data'
  );

  useEffect(() => {
    if (!uploadURL) return;
    resetForm();
    if (pathname === '/') return;
    push('/');
  }, [uploadURL]);

  return (
    <>
      <ProgressCircle uploadProgress={uploadProgress} />
      {uploadErrMsg && <h3>{uploadErrMsg}</h3>}
    </>
  );
};

export default ProgressBar;
