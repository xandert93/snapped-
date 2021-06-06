import React, { useContext } from 'react';

import authContext from '../../../contexts/1.auth/authContext';
import ProfileProvider from '../../../contexts/4.profile/ProfileProvider';
import { useSetDocumentTitle } from '../../../custom-hooks';

import { useParams } from 'react-router';

import UpdateModal from '../../../components/protected/UpdateModal';
import UserHeader from './ProfileHeader/UserHeader';
import AltUserHeader from './ProfileHeader/AltUserHeader';
import ImageTabs from './ImageTabs';
import AltImageGrid from './ImageGrid/AltImageGrid';
import UserImageGrid from './ImageGrid/UserImageGrid';

export default function Profile() {
  const { username } = useParams();
  useSetDocumentTitle(username);
  const { currentUserDoc } = useContext(authContext);
  const isCurrentUserPage = currentUserDoc.username === username;

  // const arePostsExhausted = noOfReqdPosts === noOfPosts;

  return (
    <ProfileProvider>
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

      {/* {!!displayedPosts?.length && (
        <Box style={{ textAlign: 'center' }}>
          <Button
            disabled={arePostsExhausted}
            variant="contained"
            color="secondary"
            onClick={() => setNoOfReqdPosts((x) => x + 6)}>
            Fetch 6
          </Button>
          <Button
            disabled={arePostsExhausted}
            variant="contained"
            color="secondary"
            onClick={() => setNoOfReqdPosts(noOfPosts)}>
            Fetch {noOfPosts}
          </Button>
        </Box>
      )} */}
    </ProfileProvider>
  );
}
