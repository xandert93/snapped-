import { Link } from '../../../../../../../../../components';
import { buildProfilePath } from '../../../../../../../../../constants/routes';

export default function CardTitle({ username }) {
  return <Link to={buildProfilePath(username)}>{username}</Link>;
}
