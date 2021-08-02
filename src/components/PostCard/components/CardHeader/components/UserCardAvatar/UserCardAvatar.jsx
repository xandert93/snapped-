import { useSelector } from 'react-redux';
import { userProfilePicURLSelector, userUsernameSelector } from '../../../../../../state/auth/selectors';
import { CardAvatar } from '../CardAvatar';

export default function UserCardAvatar() {
  const userUsername = useSelector(userUsernameSelector);
  const profilePicURL = useSelector(userProfilePicURLSelector);

  return <CardAvatar url={profilePicURL} username={userUsername} />;
}
