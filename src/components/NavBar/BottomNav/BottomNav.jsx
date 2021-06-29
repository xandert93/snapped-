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
      className={classes.root}
      value={tab}
      onChange={handleChange}>
      <BottomNavigationAction
        label="Explore"
        value="Explore"
        icon={<Search fontSize="large" />}
      />
      <BottomNavigationAction
        label="Timeline"
        value="Timeline"
        icon={<Timeline fontSize="large" />}
      />
      <BottomNavigationAction
        label="My Profile"
        value="My Profile"
        icon={<AccountCircle fontSize="large" />}
      />
    </BottomNavigation>
  );
}
