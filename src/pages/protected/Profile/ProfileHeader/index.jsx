import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from '@material-ui/core';
import { forwardRef, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FollowButton from '../../../../components/protected/layout/FollowButton';
import authContext from '../../../../contexts/1.auth/authContext';
import { profileContext } from '../../../../contexts/4.profile/profileContext';
import useStyles from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ProfileHeader({ userDoc, setUserDoc }) {
  const { username, fullName, followers, following } = userDoc;
  const classes = useStyles();
  const { currentUserDoc } = useContext(authContext);
  const { noOfPosts } = useContext(profileContext);

  const [modalOpened, setModalOpened] = useState(false);

  const mutualFollow = followers.filter((f) =>
    currentUserDoc.following.includes(f)
  );

  const isCurrentUserPage = currentUserDoc.username === username;
  return (
    <Grid container>
      <Grid item xs={3}>
        <Avatar className={classes.avatar} alt={fullName} src={''} />
      </Grid>

      <Grid item xs={9}>
        <Typography variant="h5" noWrap>
          {username}{' '}
          {!isCurrentUserPage && (
            <FollowButton altUserDoc={userDoc} setAltUserDoc={setUserDoc} />
          )}
        </Typography>
        <ButtonGroup variant="outlined" size="small">
          <Button>{noOfPosts} Posts</Button>
          <Button onClick={() => setModalOpened(true)}>
            {followers.length} Follower
            {followers.length !== 1 && 's'}
          </Button>
          <Button onClick={() => setModalOpened(true)}>
            {following.length} Following
          </Button>
        </ButtonGroup>
      </Grid>
      <Dialog
        open={modalOpened}
        TransitionComponent={Transition}
        onClose={() => setModalOpened(false)}>
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
