import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  UserHeader,
  ImageTabs,
  UserImageGrid,
  PostEditDialog,
  AltUserHeader,
  AltImageGrid,
} from './components';
import { Container } from '@material-ui/core';
import { userSelector } from '../../state/selectors';
import { useState } from 'react';

export default function Profile() {
  const { username } = useParams();
  useSetDocumentTitle(username);

  const user = useSelector(userSelector);
  const isUsersProfile = user.username === username;

  usePostsCollection(username);

  // const [isPostEditDialogOpen, setIsPostEditDialogOpen] = useState(false);

  return (
    <Container maxWidth="xl" disableGutters>
      {isUsersProfile ? (
        <>
          <UserHeader />
          <ImageTabs />
          <UserImageGrid />
          {/* <PostEditDialog /> */}
        </>
      ) : (
        <>
          <AltUserHeader />
          <AltImageGrid />
        </>
      )}
    </Container>
  );
}
