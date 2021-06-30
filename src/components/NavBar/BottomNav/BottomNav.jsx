import { Avatar } from '@material-ui/core';
import { BottomNavigationAction } from '@material-ui/core';
import { BottomNavigation } from '@material-ui/core';
import { Search, Timeline, AccountCircle } from '@material-ui/icons';
import React, { useState } from 'react';
import useStyles from './styles';

export default function BottomNav() {
  const classes = useStyles();
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
      <BottomNavigationAction value="Timeline" icon={<Timeline />} />
      <BottomNavigationAction
        value="My Profile"
        icon={
          <Avatar
            src="https://pbs.twimg.com/profile_images/1325229157131890689/dWcfdxWS_400x400.jpg"
            className={classes.avatar}>
            <AccountCircle />
          </Avatar>
        }
      />
    </BottomNavigation>
  );
}
