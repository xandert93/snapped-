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
  const { user } = useContext(authContext);
  const isUsersProfile = user.username === username;

  return (
    <ProfileProvider>
      <Container maxWidth="xl" disableGutters>
        {isUsersProfile ? (
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
