import { ProfileHeader } from '../../components';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../../state/auth/selectors';
import { selectUserPosts } from '../../../../state/posts/selectors';

export default function UserHeader() {
  const user = useSelector(selectUser);

  const postCount = useSelector(selectUserPosts).length;

  return <ProfileHeader profile={user} postCount={postCount} />;
}
