import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserProfilePicURL, selectUserUsername } from '../../../state/auth/selectors';

import { BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Avatar } from '@material-ui/core';
import { Search as SearchIcon, AccountCircle as AccountIcon, AmpStories as TimelineIcon } from '@material-ui/icons';

import { buildProfilePath, ROUTES } from '../../../constants/routes';

import useStyles from './styles';

import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

//Ideally, on page load, extract "path" pattern via useRouteMatch(). This value would match a key in the lookup below.
//initialTabIdx would then be set to this instead via idxLookup[path] and the rest would follow...

/* const idxLookup = {
  [ROUTES.EXPLORE]: 0,
  [ROUTES.HOME]: 1,
  [ROUTES.USER_PROFILE]: 2,
}; */

export default function BottomNavigation() {
  const classes = useStyles();

  const userUsername = useSelector(selectUserUsername);
  const userProfilePicURL = useSelector(selectUserProfilePicURL);

  //Since this component is outside of a <Route/>, can't use "{path} = useRouteMatch()" to get page pattern of the current page
  //using this crap workaround for now
  const { push } = useHistory();
  const { pathname } = useLocation();
  const pageName = pathname.split('/')[1];

  const idxLookup = {
    explore: 0,
    home: 1,
    p: 2,
  };

  const pathnameLookup = {
    0: ROUTES.EXPLORE,
    1: ROUTES.HOME,
    2: buildProfilePath(userUsername),
  };

  let initialTabIdx = idxLookup[pageName];

  const [tabIdx, setTabIdx] = useState(initialTabIdx);

  useEffect(() => setTabIdx(idxLookup[pageName]), [pageName]);

  const handleChange = (e, newTabIdx) => {
    push(pathnameLookup[newTabIdx]);
    setTabIdx(newTabIdx);
  };

  const MyProfileIcon = () => (
    <Avatar src={userProfilePicURL} className={classes.avatar}>
      <AccountIcon />
    </Avatar>
  );

  return (
    <MuiBottomNavigation
      className={classes.bottomNavigation + ' mui-fixed'}
      value={tabIdx}
      onChange={handleChange}
      // showLabels
    >
      <BottomNavigationAction /* label="Explore" */ icon={<SearchIcon />} />
      <BottomNavigationAction /* label="Timeline" */ icon={<TimelineIcon />} />
      <BottomNavigationAction /* label="Me!" */ icon={<MyProfileIcon />} />
    </MuiBottomNavigation>
  );
}
