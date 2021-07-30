import { Link } from 'react-router-dom';
import { FollowButton } from '../../../../../components';
import { buildProfilePath } from '../../../../../constants/routes';

export default function SuggestedProfile({ altUser }) {
  return (
    <div style={{ border: '2px grey solid', borderRadius: 5 }}>
      <div>
        <Link to={buildProfilePath(altUser.username)}>{altUser.username}</Link>
        <FollowButton altUser={altUser} />
      </div>
    </div>
  );
}
