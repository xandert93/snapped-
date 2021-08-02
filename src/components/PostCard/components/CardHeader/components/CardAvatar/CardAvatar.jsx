import { Avatar } from '@material-ui/core';

import useStyles from './styles';

import { Link } from '../../../../../Link';
import { buildProfilePath } from '../../../../../../constants/routes';

export default function CardAvatar({ url, username }) {
  const classes = useStyles();

  return (
    <Link to={buildProfilePath(username)}>
      <Avatar className={classes.cardAvatar} src={url}>
        {username[0].toUpperCase()}
      </Avatar>
    </Link>
  );
}
