import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostsColl } from '../../../../custom-hooks';
import { getUserDocFromDb } from '../../../../services/firebase';
import FollowButton from '../../layout/FollowButton';
import useStyles from './styles';

const AltUser = () => {
  const classes = useStyles();

  const { username } = useParams();
  const [altUserDoc, setAltUserDoc] = useState(null);
  useEffect(() => {
    getUserDocFromDb(null, username).then(setAltUserDoc);
  }, []);

  const [altUsersPosts, numOfAltUsersPosts] = usePostsColl(username);
  const [numOfRequestedDocs, setNumOfRequestedDocs] = useState(6);

  const isNoMorePosts = numOfRequestedDocs === numOfAltUsersPosts;

  return (
    <Container className="camera-roll">
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
            <ButtonGroup variant="contained">
              <Button>{altUsersPosts.length} Posts</Button>
              <Button>
                {altUserDoc.followers.length} Follower
                {altUserDoc.followers.length > 1 && 's'}
              </Button>
              <Button>{altUserDoc.following.length} Following</Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" component="h1">
              {altUserDoc.fullName}
            </Typography>
            <Box>
              <Typography variant="caption">Personal Blog</Typography>
            </Box>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={1}>
        {altUsersPosts.map(
          ({ id, url }, idx) =>
            idx < numOfRequestedDocs && (
              <Grid key={id} item xs={4} md={3}>
                <Box className={classes.imageBox}>
                  <img
                    src={url}
                    data-index={idx}
                    alt={`${altUserDoc.username}'s post`}
                    className={classes.image}
                  />
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
