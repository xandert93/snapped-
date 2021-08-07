import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  Grid,
  Paper,
  Slide,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { Lock, Publish } from '@material-ui/icons';
import { useEffect } from 'react';
import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FollowButton } from '../FollowButton';
import { Link } from '../Link';

import useStyles from './styles';
import UploadAvatar from '../UploadAvatar/UploadAvatar';
import { userFollowingSelector, selectUserUsername } from '../../state/auth/selectors';
import { createFollowUsersLookup } from '../../state/lookups/actions';
import { buildProfilePath } from '../../constants/routes';
import { numOf } from '../../utils/helpers';
import FollowDialog from './components/FollowDialog/FollowDialog';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

export default function ProfileHeader({ profile, setProfile, postCount }) {
  const classes = useStyles();
  const { url, path } = useRouteMatch();

  const { username, name, followers, following } = profile;

  const lookup = useSelector((state) => state.lookups.followUsers);

  useEffect(() => {
    if (followerCount + followingCount) dispatch(createFollowUsersLookup(followers, following));
  }, []);

  const followerCount = followers.length;
  const followingCount = following.length;

  const dispatch = useDispatch();
  const userUsername = useSelector(selectUserUsername);
  const userFollowing = useSelector(userFollowingSelector);

  //e.g. people that altUser is followed by, that user also follows
  const mutualFollow = followers.filter((f) => userFollowing.includes(f));

  const isUsersPage = userUsername === username;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (e, tabIdx) => {
    // push(`/${username}/${tabNameToIdx[tabIdx]}`);
    setSelectedTab(tabIdx);
  };

  const handleFollowshipClick = (newTabIdx) => {
    setIsDialogOpen(true);
    setSelectedTab(newTabIdx);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" noWrap>
              <strong>{username}</strong>
            </Typography>
          </Grid>

          {!lookup ? (
            <span>OTW, my G.</span>
          ) : (
            <Grid item xs={4}>
              <Button variant="outlined" onClick={() => handleFollowshipClick(1)}>
                {numOf(followingCount, 'following')}
              </Button>
              <Button variant="outlined" onClick={() => handleFollowshipClick(0)}>
                {numOf(followerCount, 'follower')}
              </Button>{' '}
            </Grid>
          )}

          <Grid item xs={3}>
            <Avatar
              className={classes.avatar}
              component={isUsersPage ? UploadAvatar : Box}
              alt={name}
              src={profile.profilePicURL}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">{postCount} posts</Typography>
            {!isUsersPage && <FollowButton altUser={profile} setAltUser={setProfile} />}
          </Grid>

          <Grid item xs={12}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Bio</Typography>
          </Grid>
        </Grid>
      </Paper>

      <FollowDialog
        {...{
          followers,
          following,
          setIsDialogOpen,
          selectedTab,
          handleTabChange,
          isDialogOpen,
        }}
      />
    </>
  );
}
