import { useEffect } from 'react';
import { useBucket } from '../../../../../custom-hooks';

import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../../constants/routes';

import { useDispatch, useSelector } from 'react-redux';
import { userUsernameSelector } from '../../../../../state/auth/selectors';
import { clearUploadForm } from '../../../../../state/upload/actions';
import { createPost } from '../../../../../state/posts/actions';
import { closePostUploadDialog, setSuccessSnackbar } from '../../../../../state/app/actions';

import { ProgressCircle } from '../ProgressCircle';
import { selectUserPosts } from '../../../../../state/posts/selectors';

export default function Progress() {
  const { pathname } = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const userUsername = useSelector(userUsernameSelector);
  const { confirmedFile, description } = useSelector((state) => state.upload);
  const newPostCount = useSelector(selectUserPosts).length + 1;

  const { uploadProgress, firestoreDoc } = useBucket(confirmedFile, description);

  useEffect(() => {
    if (!firestoreDoc) return;
    //must add firestore doc to state; it contains docId (!) which we can later use to perform Firestore CRUD.
    dispatch(createPost(firestoreDoc));
    dispatch(closePostUploadDialog());
    dispatch(clearUploadForm());
    dispatch(setSuccessSnackbar(`Congratulations. You have now made ${newPostCount} posts!`));

    if (pathname !== ROUTES.HOME && !description.isPrivate) return history.push(ROUTES.HOME);
    if (pathname === ROUTES.HOME && !description.isPrivate)
      document.body.scrollIntoView({ behavior: 'smooth', block: 'end' }); //doesn't work
    if (pathname !== `/profiles/${userUsername}/private` && description.isPrivate)
      return history.push(`/profiles/${userUsername}/private`);
  }, [firestoreDoc]);

  return <ProgressCircle uploadProgress={uploadProgress} />;
}
