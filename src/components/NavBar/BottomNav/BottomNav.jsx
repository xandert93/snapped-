import { Avatar } from '@material-ui/core';
import { BottomNavigationAction } from '@material-ui/core';
import { BottomNavigation } from '@material-ui/core';
import { Search, Timeline, AccountCircle } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import { ROUTES } from '../../../constants/routes';
import { authContext } from '../../../contexts/1.auth/authContext';
import { Link } from '../../Link';
import useStyles from './styles';

export default function BottomNav() {
  const classes = useStyles();
  const { user } = useContext(authContext);
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
          <Link to={`/p/${user.username}`}>
            <Avatar src={user.profilePicURL} className={classes.avatar}>
              <AccountCircle />
            </Avatar>
          </Link>
        }
      />
    </BottomNavigation>
  );
}
