import { Avatar } from '@material-ui/core';
import { BottomNavigationAction } from '@material-ui/core';
import { BottomNavigation } from '@material-ui/core';
import { Search, Timeline, AccountCircle } from '@material-ui/icons';
import { useState } from 'react';
import { buildProfilePath, ROUTES } from '../../../constants/routes';
import { useSelector } from 'react-redux';
import { Link } from '../../Link';
import useStyles from './styles';
import {
  userProfilePicURLSelector,
  userUsernameSelector,
} from '../../../state/auth/selectors';

export default function BottomNav() {
  const classes = useStyles();
  const userUsername = useSelector(userUsernameSelector);
  const userProfilePicURL = useSelector(userProfilePicURLSelector);
  const [tab, setTab] = useState('Timeline');

  const handleChange = (e, newTab) => {
    setTab(newTab);
  };

  return (
    <BottomNavigation
      className={classes.root + ' mui-fixed'}
      value={tab}
      onChange={handleChange}>
      <BottomNavigationAction value="Explore" icon={<Search />} />
      <BottomNavigationAction
        value="Timeline"
        icon={
          <Link to={ROUTES.HOME}>
            <Timeline />
          </Link>
        }
      />
      <BottomNavigationAction
        value="My Profile"
        icon={
          <Link to={buildProfilePath(userUsername)}>
            <Avatar src={userProfilePicURL} className={classes.avatar}>
              <AccountCircle />
            </Avatar>
          </Link>
        }
      />
    </BottomNavigation>
  );
}
