import { useSelector } from 'react-redux';
import { profilePicURLSelector } from '../../../../../../state/lookups/selectors';
import { useCard } from '../../../../context';
import { CardAvatar } from '../CardAvatar';

export default function AltUserCardAvatar() {
  const { username } = useCard();
  const profilePicURL = useSelector((state) => profilePicURLSelector(state, username));

  return <CardAvatar url={profilePicURL} username={username} />;
}
