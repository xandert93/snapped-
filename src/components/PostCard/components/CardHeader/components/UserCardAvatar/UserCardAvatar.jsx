import { useSelector } from 'react-redux';
import { userProfilePicURLSelector, selectUserUsername } from '../../../../../../state/auth/selectors';
import { CardAvatar } from '../CardAvatar';

export default function UserCardAvatar() {
  const userUsername = useSelector(selectUserUsername);
  const profilePicURL = useSelector(userProfilePicURLSelector);

  return <CardAvatar url={profilePicURL} username={userUsername} />;
}
