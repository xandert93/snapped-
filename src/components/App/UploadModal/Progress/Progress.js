import { useContext, useEffect } from 'react';
import { useBucket } from '../../../../custom-hooks';
import { ProgressCircle } from '../ProgressCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { appContext } from '../../../../contexts/3.app/appContext';
import { userSelector } from '../../../../state/selectors';
import { clearForm } from '../../../../state/upload/actions';

const Progress = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const { username } = useSelector(userSelector);
  const { file, description } = useSelector((state) => state.upload);

  const { uploadProgress, firestoreDoc, uploadErrMsg } = useBucket(
    file,
    description
  );

  const { setHomePosts } = useContext(appContext);

  useEffect(() => {
    if (!firestoreDoc) return;
    //must add firestore doc to state; it contains docId (!) we can use to perform CRUD.
    setHomePosts((x) => [firestoreDoc, ...x]); //must be inserted first (newest --> oldest)
    dispatch(clearForm());

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
