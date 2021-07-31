import { buildProfilePath } from '../../../../../../constants/routes';
import { Link } from '../../../../../Link';

export default function CardTitle({ username }) {
  return <Link to={buildProfilePath(username)}>{username}</Link>;
}
