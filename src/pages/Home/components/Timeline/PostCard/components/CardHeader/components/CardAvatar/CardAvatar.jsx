import { useSelector } from 'react-redux';
import { profilePicURLSelector } from '../../../../../../../../../state/lookups/selectors';
import { Avatar } from '@material-ui/core';
import { Link } from '../../../../../../../../../components';

import useStyles from './styles';
import { buildProfilePath } from '../../../../../../../../../constants/routes';

export default function CardAvatar({ username }) {
  const classes = useStyles();

  const profilePicURL = useSelector((state) =>
    profilePicURLSelector(state, username)
  );

  return (
    <Link to={buildProfilePath(username)}>
      <Avatar className={classes.cardAvatar} src={profilePicURL}>
        {username[0].toUpperCase()}
      </Avatar>
    </Link>
  );
}
