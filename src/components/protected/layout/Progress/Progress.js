import React, { useContext, useEffect } from 'react';
import { useBucket } from '../../../../custom-hooks';
import authContext from '../../../../contexts/auth/authContext';
import ProgressCircle from './ProgressCircle';
import { useHistory, useLocation } from 'react-router';

const Progress = ({ file, description, resetForm }) => {
  const { currentUserDoc } = useContext(authContext);
  const { pathname } = useLocation();
  const history = useHistory();

  const { uploadProgress, uploadURL, uploadErrMsg } = useBucket(
    currentUserDoc,
    file,
    description,
    'Image URL Data'
  );

  useEffect(() => {
    if (!uploadURL) return;
    resetForm();
    if (pathname !== '/' && !description.isPrivate) return history.push('/');
    if (pathname !== '/camera-roll/private' && description.isPrivate)
      return history.push('/camera-roll/private');
  }, [uploadURL]);

  return (
    <>
      <ProgressCircle uploadProgress={uploadProgress} />
      {uploadErrMsg && <h3>{uploadErrMsg}</h3>}
    </>
  );
};

export default Progress;
