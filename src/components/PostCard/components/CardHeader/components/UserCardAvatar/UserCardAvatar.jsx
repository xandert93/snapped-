import { useSelector } from 'react-redux';
import { selectUserProfilePicURL, selectUserUsername } from '../../../../../../state/auth/selectors';
import { CardAvatar } from '../CardAvatar';

export default function UserCardAvatar() {
  const userUsername = useSelector(selectUserUsername);
  const profilePicURL = useSelector(selectUserProfilePicURL);

  return <CardAvatar url={profilePicURL} username={userUsername} />;
}
