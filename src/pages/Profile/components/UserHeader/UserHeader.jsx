import { ProfileHeader } from '../../../../components';

import { useSelector } from 'react-redux';
import { userSelector } from '../../../../state/selectors';

const UserHeader = () => {
  const user = useSelector(userSelector);

  return <ProfileHeader profile={user} />;
};

export default UserHeader;
