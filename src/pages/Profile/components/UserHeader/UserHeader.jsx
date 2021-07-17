import { ProfileHeader } from '../../../../components';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../state/selectors';

export default function UserHeader() {
  const user = useSelector(userSelector);

  return <ProfileHeader profile={user} />;
}
