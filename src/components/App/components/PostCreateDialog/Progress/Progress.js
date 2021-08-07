import { useEffect } from 'react';
import { useBucket } from '../../../../../custom-hooks';

import { useHistory, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../../../constants/routes';

import { useDispatch, useSelector } from 'react-redux';
import { selectUserUsername } from '../../../../../state/auth/selectors';

import { createPost } from '../../../../../state/posts/actions';

import { ProgressCircle } from '../ProgressCircle';

export default function Progress() {
  const { pathname } = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const userUsername = useSelector(selectUserUsername);
  const { confirmedFile, description } = useSelector((state) => state.upload);

  const { uploadProgress, firestoreDoc } = useBucket(confirmedFile, description);

  useEffect(() => {
    if (!firestoreDoc) return;
    //must add firestore doc to state; it contains docId (!) which we can later use to perform Firestore CRUD.
    dispatch(createPost(firestoreDoc));

    if (pathname !== ROUTES.HOME && !description.isPrivate) return history.push(ROUTES.HOME);
    if (pathname === ROUTES.HOME && !description.isPrivate)
      document.body.scrollIntoView({ behavior: 'smooth', block: 'end' }); //doesn't work
    if (pathname !== `/p/${userUsername}/private` && description.isPrivate)
      return history.push(`/p/${userUsername}/private`);
  }, [firestoreDoc]);

  return <ProgressCircle uploadProgress={uploadProgress} />;
}
