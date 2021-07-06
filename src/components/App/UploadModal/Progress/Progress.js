import React, { useContext, useEffect } from 'react';
import { useBucket } from '../../../../custom-hooks';
import { ProgressCircle } from '../ProgressCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { uploadContext } from '../../../../contexts/2.upload/uploadContext';
import { ROUTES } from '../../../../constants/routes';
import { authContext } from '../../../../contexts/1.auth/authContext';

const Progress = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const {
    user: { username },
  } = useContext(authContext);

  const { file, description, resetForm } = useContext(uploadContext);

  const { uploadProgress, uploadURL, uploadErrMsg } = useBucket(
    file,
    description
  );

  useEffect(() => {
    if (!uploadURL) return;
    resetForm();
    if (pathname !== ROUTES.HOME && !description.isPrivate)
      return history.push(ROUTES.HOME);
    if (pathname !== `p/${username}/private` && description.isPrivate)
      return history.push(`p/${username}/private`);
  }, [uploadURL]);

  return (
    <>
      <ProgressCircle uploadProgress={uploadProgress} />
      {uploadErrMsg && <h3>{uploadErrMsg}</h3>}
    </>
  );
};

export default Progress;
