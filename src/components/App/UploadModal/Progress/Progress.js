import React, { useContext, useEffect } from 'react';
import { useBucket } from '../../../../custom-hooks';
import { ProgressCircle } from '../ProgressCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { uploadContext } from '../../../../contexts/2.upload/uploadContext';
import { ROUTES } from '../../../../constants/routes';
import { authContext } from '../../../../contexts/1.auth/authContext';
import { appContext } from '../../../../contexts/3.app/appContext';

const Progress = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const {
    user: { username },
  } = useContext(authContext);

  const { file, description, resetForm } = useContext(uploadContext);

  const { uploadProgress, firestoreDoc, uploadErrMsg } = useBucket(
    file,
    description
  );

  const { setHomePosts } = useContext(appContext);

  useEffect(() => {
    if (!firestoreDoc) return;
    //must add firestore doc to state; it contains docId (!) we can use to perform CRUD.
    setHomePosts((x) => [firestoreDoc, ...x]); //must be inserted first (newest --> oldest)
    resetForm();
    if (pathname !== ROUTES.HOME && !description.isPrivate)
      return history.push(ROUTES.HOME);
    if (pathname === ROUTES.HOME && !description.isPrivate)
      document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });
    if (pathname !== `p/${username}/private` && description.isPrivate)
      return history.push(`p/${username}/private`);
  }, [firestoreDoc]);

  return (
    <>
      <ProgressCircle uploadProgress={uploadProgress} />
      {uploadErrMsg && <h3>{uploadErrMsg}</h3>}
    </>
  );
};

export default Progress;
