import React, { useEffect } from 'react';
import { useBucket } from '../../../../custom-hooks';
import ProgressCircle from './ProgressCircle';
import { useHistory, useLocation } from 'react-router';

const Progress = ({ file, description, resetForm }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const { uploadProgress, uploadURL, uploadErrMsg } = useBucket(
    file,
    description
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
