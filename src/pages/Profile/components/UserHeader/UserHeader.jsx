import { ProfileHeader } from '../../../../components';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../../state/auth/selectors';

export default function UserHeader() {
  const user = useSelector(userSelector);

  const postCount = useSelector((state) => state.posts.user.length);

  return <ProfileHeader profile={user} postCount={postCount} />;
}
