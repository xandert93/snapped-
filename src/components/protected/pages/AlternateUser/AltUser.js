import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogTitle,
  Grid,
  Slide,
  Typography,
} from '@material-ui/core';
import { FavoriteBorder, MessageOutlined } from '@material-ui/icons';
import React, { forwardRef, useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import authContext from '../../../../contexts/auth/authContext';
import { usePostsColl } from '../../../../custom-hooks';
import { getUserDocFromDb } from '../../../../services/firebase';
import FollowButton from '../../layout/FollowButton';
import useStyles from './styles';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AltUser = () => {
  const classes = useStyles();
  const { currentUserDoc } = useContext(authContext);

  const { username } = useParams();
  const [altUserDoc, setAltUserDoc] = useState(null);
  useEffect(() => {
    getUserDocFromDb(null, username).then(setAltUserDoc);
  }, []);

  const [altUsersPosts, numOfAltUsersPosts] = usePostsColl(username);
  const [numOfRequestedDocs, setNumOfRequestedDocs] = useState(6);

  const [modalOpened, setModalOpened] = useState(false);

  // useEffect(() => getUsersFollowDocs(altUserDoc).then(console.log), []);

  const isNoMorePosts = numOfRequestedDocs === numOfAltUsersPosts;

  const mutualFollow = altUserDoc?.followers.filter((follower) =>
    currentUserDoc.following.includes(follower)
  );

  return (
    <Container>
      {altUserDoc && (
        <Grid container>
          <Grid item xs={3}>
            <Avatar
              className={classes.avatar}
              alt={altUserDoc?.fullName}
              src={altUsersPosts[0]?.url}
            />
          </Grid>

          <Grid item xs={9}>
            <Typography variant="h5" noWrap>
              {altUserDoc.username}{' '}
              <FollowButton
                altUserDoc={altUserDoc}
                setAltUserDoc={setAltUserDoc}
              />
            </Typography>
            <ButtonGroup variant="outlined" size="small">
              <Button>{altUsersPosts.length} Posts</Button>
              <Button onClick={() => setModalOpened(true)}>
                {altUserDoc.followers.length} Follower
                {altUserDoc.followers.length !== 1 && 's'}
              </Button>
              <Button onClick={() => setModalOpened(true)}>
                {altUserDoc.following.length} Following
              </Button>
            </ButtonGroup>
          </Grid>

          <Dialog
            open={modalOpened}
            TransitionComponent={Transition}
            onClose={() => setModalOpened(false)}>
            <DialogTitle>Followers</DialogTitle>
            {altUserDoc.followers.map((username) => (
              <Link key={username}>
                <Typography>{username}</Typography>
              </Link>
            ))}
            <DialogTitle>Following</DialogTitle>
            {altUserDoc.following.map((username) => (
              <Box key={username}>
                <Link>
                  <Typography>{username}</Typography>
                </Link>
              </Box>
            ))}
          </Dialog>

          <Grid item xs={12}>
            <Typography variant="h6" component="h1">
              {altUserDoc.fullName}
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
      )}

      <Grid container spacing={1}>
        {altUsersPosts.map(
          ({ id, url, likes, comments }, idx) =>
            idx < numOfRequestedDocs && (
              <Grid key={id} item xs={4} md={3}>
                <Box className={classes.imageBox}>
                  <img
                    src={url}
                    data-index={idx}
                    alt={`${altUserDoc.username}'s post`}
                    className={classes.image}
                  />
                  <Box className={classes.overlay}>
                    <FavoriteBorder className={classes.overlayIcon} />
                    <Typography variant="h5" component="span">
                      {likes.length}
                    </Typography>{' '}
                    <MessageOutlined className={classes.overlayIcon} />
                    <Typography variant="h5" component="span">
                      {comments.length}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            )
        )}
      </Grid>

      {altUsersPosts.length > 0 && (
        <Box style={{ textAlign: 'center' }}>
          <Button
            disabled={isNoMorePosts}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs((x) => x + 6)}>
            Fetch 6
          </Button>
          <Button
            disabled={isNoMorePosts}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs(numOfAltUsersPosts)}>
            Fetch {numOfAltUsersPosts}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default AltUser;
