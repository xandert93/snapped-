import { useEffect } from 'react';
import { useBucket } from '../../../../custom-hooks';
import { ProgressCircle } from '../ProgressCircle';
import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../constants/routes';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../../state/selectors';
import { clearUploadForm } from '../../../../state/upload/actions';
import { createPost } from '../../../../state/posts/actions';
import {
  closePostUploadDialog,
  setSuccessSnackbar,
} from '../../../../state/app/actions';

export default function Progress() {
  const { pathname } = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const { username } = useSelector(userSelector);
  const { file, description } = useSelector((state) => state.upload);

  const { uploadProgress, firestoreDoc } = useBucket(file, description);

  useEffect(() => {
    if (!firestoreDoc) return;
    //must add firestore doc to state; it contains docId (!) which we can later use to perform Firestore CRUD.
    dispatch(createPost(firestoreDoc));
    dispatch(closePostUploadDialog());
    dispatch(clearUploadForm());
    dispatch(setSuccessSnackbar('Congratulations on your {postCount} post!'));

    if (pathname !== ROUTES.HOME && !description.isPrivate)
      return history.push(ROUTES.HOME);
    if (pathname === ROUTES.HOME && !description.isPrivate)
      document.body.scrollIntoView({ behavior: 'smooth', block: 'end' }); //doesn't work
    if (pathname !== `p/${username}/private` && description.isPrivate)
      return history.push(`p/${username}/private`);
  }, [firestoreDoc]);

  return <ProgressCircle uploadProgress={uploadProgress} />;
}
