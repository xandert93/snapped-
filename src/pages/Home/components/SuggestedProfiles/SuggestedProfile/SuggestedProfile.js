import { Link } from 'react-router-dom';
import { FollowButton } from '../../../../../components';

export default function SuggestedProfile({ altUserDoc }) {
  return (
    <div style={{ border: '2px grey solid', borderRadius: 5 }}>
      <div>
        <Link to={`/p/${altUserDoc.username}`}>{altUserDoc.username}</Link>
        <FollowButton altUserDoc={altUserDoc} />
      </div>
    </div>
  );
}
