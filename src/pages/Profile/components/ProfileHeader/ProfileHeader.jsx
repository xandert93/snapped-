import { Avatar, Box, Button, Grid, Paper, Typography } from '@material-ui/core';

import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FollowButton } from '../../../../components';

import useStyles from './styles';
import { UploadAvatar } from '../../../../components';
import { selectUserFollowings, selectUserUsername } from '../../../../state/auth/selectors';
import { createFollowUsersLookup } from '../../../../state/lookups/actions';

import { numOf } from '../../../../utils/helpers';
import FollowDialog from './components/FollowDialog/FollowDialog';
import { Route, useHistory, useParams, useRouteMatch } from 'react-router-dom';

const dialogNameLookup = {
  0: 'following',
  1: 'followers',
};

export default function ProfileHeader({ profile, setProfile, postCount }) {
  const classes = useStyles();
  const { url, path } = useRouteMatch();
  const { push } = useHistory();

  const { username, name, followers, following } = profile;

  const lookup = useSelector((state) => state.lookups.followUsers);

  useEffect(() => {
    if (followerCount + followingCount) dispatch(createFollowUsersLookup(followers, following));
  }, []);

  const followerCount = followers.length;
  const followingCount = following.length;

  const dispatch = useDispatch();
  const userUsername = useSelector(selectUserUsername);
  const userFollowing = useSelector(selectUserFollowings);

  //e.g. people that altUser is followed by, that user also follows
  const mutualFollow = followers.filter((f) => userFollowing.includes(f));

  const isUsersPage = userUsername === username;

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (e, newTabIdx) => {
    setSelectedTab(newTabIdx);
    push(url + '/' + dialogNameLookup[newTabIdx]);
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
              <Button variant="outlined" onClick={() => handleTabChange(null, 0)}>
                {`${followingCount} following`}
              </Button>
              <Button variant="outlined" onClick={() => handleTabChange(null, 1)}>
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

      <Route
        path={path + '/:dialogName'}
        children={() => (
          <FollowDialog
            {...{
              followers,
              following,
              selectedTab,
              setSelectedTab,
              handleTabChange,
              parentURL: url,
            }}
          />
        )}
      />
    </>
  );
}
