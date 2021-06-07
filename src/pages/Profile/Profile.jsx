import React, { useContext } from 'react';
import { authContext } from '../../contexts/1.auth/authContext';
import ProfileProvider from '../../contexts/4.profile/ProfileProvider';
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

export default function Profile() {
  const { username } = useParams();
  useSetDocumentTitle(username);
  const { currentUserDoc } = useContext(authContext);
  const isCurrentUserPage = currentUserDoc.username === username;

  //get rid <TempGetMoreButtons/> nested in the image grids once infinite scroll implemented

  return isCurrentUserPage ? (
    <ProfileProvider>
      <UserHeader />
      <ImageTabs />
      <UserImageGrid />
      <UpdateModal />
    </ProfileProvider>
  ) : (
    <ProfileProvider>
      <AltUserHeader />
      <AltImageGrid />
    </ProfileProvider>
  );
}
