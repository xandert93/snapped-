import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { UserHeader, ImageTabs, UserImageGrid, AltUserHeader, AltImageGrid } from './components';
import { Container } from '@material-ui/core';
import { userUsernameSelector } from '../../state/auth/selectors';

export default function Profile() {
  const { username } = useParams();
  useSetDocumentTitle(username);

  const userUsername = useSelector(userUsernameSelector);
  const isUsersProfile = userUsername === username;

  usePostsCollection();

  return (
    <Container maxWidth="xl" disableGutters>
      {isUsersProfile ? (
        <>
          <UserHeader />
          <ImageTabs />
          <UserImageGrid />
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
