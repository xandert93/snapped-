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
import { fbCreateFollowUsersLookup } from '../../services/firebase/firestore/users';
import { FollowButton } from '../FollowButton';
import { Link } from '../Link';

import useStyles from './styles';
import UploadAvatar from '../UploadAvatar/UploadAvatar';
import { userFollowingSelector, userUsernameSelector } from '../../state/auth/selectors';
import { createFollowUsersLookup } from '../../state/lookups/actions';
import { buildProfilePath } from '../../constants/routes';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function ProfileHeader({ profile, setProfile, postCount }) {
  const classes = useStyles();

  const { username, name, followers, following } = profile;

  const lookup = useSelector((state) => state.lookups.followUsers);

  useEffect(() => {
    if (followerCount + followingCount) dispatch(createFollowUsersLookup(followers, following));
  }, []);

  const followerCount = followers.length;
  const followingCount = following.length;

  const dispatch = useDispatch();
  const userUsername = useSelector(userUsernameSelector);
  const userFollowing = useSelector(userFollowingSelector);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //e.g. people that altUser is followed by, that user also follows
  const mutualFollow = followers.filter((f) => userFollowing.includes(f));

  const isUsersPage = userUsername === username;

  const [selectedTab, setSelectedTab] = useState(0);

  const tabChangeHandler = (e, tabIdx) => {
    // push(`/${username}/${tabNameToIdx[tabIdx]}`);
    setSelectedTab(tabIdx);
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
              <Button
                variant="outlined"
                onClick={() => {
                  setIsDialogOpen(true);
                  setSelectedTab(1);
                }}>
                {followingCount} following
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setIsDialogOpen(true);
                  setSelectedTab(0);
                }}>
                {followerCount} follower
                {followerCount !== 1 && 's'}
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

      {lookup && (
        <Dialog open={isDialogOpen} TransitionComponent={Transition} onClose={() => setIsDialogOpen(false)}>
          <AppBar component="div" position="static" className={classes.appBar}>
            <Tabs
              textColor="secondary"
              indicatorColor="primary"
              variant="fullWidth"
              value={selectedTab}
              onChange={tabChangeHandler}>
              <Tab icon={<Publish />} disabled={false} />
              <Tab icon={<Lock />} disabled={false} />
            </Tabs>
          </AppBar>

          {selectedTab === 0 &&
            //  <DialogTitle>Followers</DialogTitle>

            followers.map((username) => (
              <Box key={username}>
                <Link to={buildProfilePath(username)}>{username}</Link>
                <FollowButton altUser={lookup[username]} />
              </Box>
            ))}

          {selectedTab === 1 &&
            // {<DialogTitle>Following</DialogTitle>
            following.map((username) => (
              <Box key={username}>
                <Link to={buildProfilePath(username)}>{username}</Link>
                <FollowButton altUser={lookup[username]} />
              </Box>
            ))}
        </Dialog>
      )}
    </>
  );

  return (
    <Grid container>
      <Grid item xs={3}>
        <Avatar className={classes.avatar} alt={name} src={''} />
      </Grid>

      <Grid item xs={9}>
        <Typography variant="h5" noWrap>
          {username} {!isUsersPage && <FollowButton altUser={profile} setAltUser={setProfile} />}
        </Typography>
        <ButtonGroup variant="outlined" size="small">
          <Button>posts.length Posts</Button>
          <Button onClick={() => setIsDialogOpen(true)}>
            {followerCount} Follower
            {followerCount !== 1 && 's'}
          </Button>
          <Button onClick={() => setIsDialogOpen(true)}>{followingCount} Following</Button>
        </ButtonGroup>
      </Grid>
      <Dialog open={isDialogOpen} TransitionComponent={Transition} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Followers</DialogTitle>
        {followers.map((username) => (
          <Link key={username}>
            <Typography>{username}</Typography>
          </Link>
        ))}
        <DialogTitle>Following</DialogTitle>
        {following.map((username) => (
          <Box key={username}>
            <Link>
              <Typography>{username}</Typography>
            </Link>
          </Box>
        ))}
      </Dialog>

      <Grid item xs={12}>
        <Typography variant="h6" component="h1">
          {name}
        </Typography>
        <Box>
          <Typography variant="caption">Personal Blog</Typography>
          {mutualFollow && (
            <Typography variant="caption" component="p">
              Also followed by{' '}
              {mutualFollow.map((username, idx) => {
                if (idx < 3)
                  return (
                    <Typography key={username} variant="caption">
                      <Link>
                        <strong>{username}</strong>
                      </Link>
                      ,{' '}
                    </Typography>
                  );
              })}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
