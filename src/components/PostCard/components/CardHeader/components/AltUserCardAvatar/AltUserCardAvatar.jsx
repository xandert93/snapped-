import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { profilePicURLSelector } from '../../../../../../state/lookups/selectors';
import { CardContext } from '../../../../PostCard';
import { CardAvatar } from '../CardAvatar';

export default function AltUserCardAvatar() {
  const { username } = useContext(CardContext);
  const profilePicURL = useSelector((state) => profilePicURLSelector(state, username));

  return <CardAvatar url={profilePicURL} username={username} />;
}
