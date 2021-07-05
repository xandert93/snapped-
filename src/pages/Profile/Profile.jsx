import React, { useContext } from 'react';
import { authContext } from '../../contexts/1.auth/authContext';
import ProfileProvider from '../../contexts/5.profile/ProfileProvider';
import { useSetDocumentTitle } from '../../custom-hooks';
import { useParams } from 'react-router-dom';

import {
  UserHeader,
  ImageTabs,
  UserImageGrid,
  UpdateModal,
  AltUserHeader,
  AltImageGrid,
} from './components';
import { Container } from '@material-ui/core';

export default function Profile() {
  const { username } = useParams();
  useSetDocumentTitle(username);
  const { currentUser } = useContext(authContext);
  const isCurrentUserPage = currentUser.username === username;

  return (
    <ProfileProvider>
      <Container maxWidth="xl" disableGutters>
        {isCurrentUserPage ? (
          <>
            <UserHeader />
            <ImageTabs />
            <UserImageGrid />
            <UpdateModal />
          </>
        ) : (
          <>
            <AltUserHeader />
            <AltImageGrid />
          </>
        )}
      </Container>
    </ProfileProvider>
  );
}
