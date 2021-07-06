import { Link } from 'react-router-dom';
import { FollowButton } from '../../../../../components';

export default function SuggestedProfile({ altUser }) {
  return (
    <div style={{ border: '2px grey solid', borderRadius: 5 }}>
      <div>
        <Link to={`/p/${altUser.username}`}>{altUser.username}</Link>
        <FollowButton altUser={altUser} />
      </div>
    </div>
  );
}
