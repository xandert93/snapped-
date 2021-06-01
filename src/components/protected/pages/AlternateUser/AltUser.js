import { Box, Button, Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostsColl } from '../../../../custom-hooks';
import { getUserDocFromDb } from '../../../../services/firebase';
import FollowButton from '../../layout/FollowButton';

const AltUser = () => {
  const { username } = useParams();

  const [numOfRequestedDocs, setNumOfRequestedDocs] = useState(1);

  const [usersImageDocs, numOfAvailableDocs] = usePostsColl(username);

  const noMoreImageDocs = numOfRequestedDocs === numOfAvailableDocs;

  const [altUserDoc, setAltUserDoc] = useState(null);

  useEffect(() => {
    getUserDocFromDb(null, username).then(setAltUserDoc);
  }, []);

  return (
    <Container className="camera-roll">
      {altUserDoc && (
        <Box>
          <Typography variant="h4" noWrap>
            {altUserDoc.fullName}'s posts
          </Typography>

          <FollowButton altUserDoc={altUserDoc} setAltUserDoc={setAltUserDoc} />

          <div>
            {altUserDoc.username} is following:
            {altUserDoc.following.map((followedId) => (
              <span>{followedId}, </span>
            ))}
          </div>

          <div>
            {altUserDoc.username} is followed by:
            {altUserDoc.followers.map((followerId) => (
              <span>{followerId}, </span>
            ))}
          </div>
        </Box>
      )}

      {usersImageDocs.map(
        ({ id, url }, idx) =>
          idx < numOfRequestedDocs && (
            <img key={id} src={url} data-index={idx} alt="" />
          )
      )}
      {usersImageDocs.length > 0 && (
        <Box style={{ textAlign: 'center' }}>
          <Button
            disabled={noMoreImageDocs}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs((x) => x + 1)}>
            Fetch 1
          </Button>
          <Button
            disabled={noMoreImageDocs}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs(numOfAvailableDocs)}>
            Fetch {numOfAvailableDocs}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default AltUser;
