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
import { forwardRef, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { profileContext } from '../../contexts/5.profile/profileContext';
import { createFollowUsersLookup } from '../../services/firebase/firestore';
import { FollowButton } from '../FollowButton';
import { Link } from '../Link';

import useStyles from './styles';
import UploadAvatar from '../UploadAvatar/UploadAvatar';
import { userSelector } from '../../state/selectors';

const Transition = forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

export default function ProfileHeader({ profile, setProfile }) {
  const classes = useStyles();

  const { username, fullName, followers, following } = profile;
  const user = useSelector(userSelector);
  const { noOfPosts } = useContext(profileContext);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //e.g. people that altUser is followed by, that user also follows
  const mutualFollow = followers.filter((f) => user.following.includes(f));

  const isUsersPage = user.username === username;

  const [selectedTab, setSelectedTab] = useState(0);

  const tabChangeHandler = (e, tabIdx) => {
    // push(`/p/${username}/${tabNameToIdx[tabIdx]}`);
    setSelectedTab(tabIdx);
  };

  const [followUsersLookup, setFollowUsersLookup] = useState(null);
  useEffect(() => {
    if (followers.length + following.length !== 0)
      createFollowUsersLookup(followers, following).then(setFollowUsersLookup);
  }, [selectedTab]);

  return (
    <>
      <Paper className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" noWrap>
              <strong>{username}</strong>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Button
              variant="outlined"
              onClick={() => {
                setIsDialogOpen(true);
                setSelectedTab(1);
              }}>
              {following.length} following
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setIsDialogOpen(true);
                setSelectedTab(0);
              }}>
              {followers.length} follower
              {followers.length !== 1 && 's'}
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Avatar
              className={classes.avatar}
              component={isUsersPage ? UploadAvatar : Box}
              alt={fullName}
              src={profile.profilePicURL}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">{noOfPosts} posts</Typography>
            {!isUsersPage && (
              <FollowButton altUser={profile} setAltUser={setProfile} />
            )}
          </Grid>

          <Grid item xs={12}>
            <Typography>{fullName}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">Bio</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        onClose={() => setIsDialogOpen(false)}>
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
              <Link to={`/p/${username}`}>{username}</Link>
              <FollowButton altUser={followUsersLookup?.[username]} />
            </Box>
          ))}

        {selectedTab === 1 &&
          // {<DialogTitle>Following</DialogTitle>
          following.map((username) => (
            <Box key={username}>
              <Link to={`/p/${username}`}>{username}</Link>
              <FollowButton altUser={followUsersLookup?.[username]} />
            </Box>
          ))}
      </Dialog>
    </>
  );

  return (
    <Grid container>
      <Grid item xs={3}>
        <Avatar className={classes.avatar} alt={fullName} src={''} />
      </Grid>

      <Grid item xs={9}>
        <Typography variant="h5" noWrap>
          {username}{' '}
          {!isUsersPage && (
            <FollowButton altUser={profile} setAltUser={setProfile} />
          )}
        </Typography>
        <ButtonGroup variant="outlined" size="small">
          <Button>{noOfPosts} Posts</Button>
          <Button onClick={() => setIsDialogOpen(true)}>
            {followers.length} Follower
            {followers.length !== 1 && 's'}
          </Button>
          <Button onClick={() => setIsDialogOpen(true)}>
            {following.length} Following
          </Button>
        </ButtonGroup>
      </Grid>
      <Dialog
        open={isDialogOpen}
        TransitionComponent={Transition}
        onClose={() => setIsDialogOpen(false)}>
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
          {fullName}
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
