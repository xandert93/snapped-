import React, { useContext, useEffect } from 'react';
import useBucket from '../../../custom-hooks/useBucket';
import authContext from '../../../contexts/auth/authContext';

const ProgressBar = ({ file, imgDescription, resetForm }) => {
  const { currentUser } = useContext(authContext);

  const { uploadProgress, uploadURL, uploadErrMsg } = useBucket(
    currentUser,
    file,
    imgDescription,
    'Image URL Data'
  );

  useEffect(() => uploadURL && resetForm(), [uploadURL]);

  return (
    <>
      <div
        className="progress-bar"
        style={{ width: `${uploadProgress}%` }}
      ></div>
      {uploadErrMsg && <h3>{uploadErrMsg}</h3>}
    </>
  );
};

export default ProgressBar;
