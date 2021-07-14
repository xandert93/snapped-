import ProfileProvider from '../../contexts/5.profile/ProfileProvider';
import { useSetDocumentTitle } from '../../custom-hooks';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  UserHeader,
  ImageTabs,
  UserImageGrid,
  UpdateModal,
  AltUserHeader,
  AltImageGrid,
} from './components';
import { Container } from '@material-ui/core';
import { userSelector } from '../../state/selectors';

export default function Profile() {
  const { username } = useParams();
  useSetDocumentTitle(username);
  const user = useSelector(userSelector);
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
