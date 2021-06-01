import { Link } from 'react-router-dom';
import FollowButton from '../FollowButton';

const SuggestedProfile = ({ altUserDoc }) => {
  return (
    <div style={{ border: '2px grey solid', borderRadius: 5 }}>
      <div>
        <Link to={`/p/${altUserDoc.username}`}>{altUserDoc.username}</Link>
        <FollowButton altUserDoc={altUserDoc} />
      </div>
    </div>
  );
};

export default SuggestedProfile;
