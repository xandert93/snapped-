import { Box, Button, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostsColl } from '../../../../custom-hooks';
import { getUserDocFromDb } from '../../../../services/firebase';

const OtherUser = () => {
  const { username } = useParams();

  const [numOfRequestedDocs, setNumOfRequestedDocs] = useState(1);

  const [usersImageDocs, numOfAvailableDocs] = usePostsColl(username);

  const noMoreImageDocs = numOfRequestedDocs === numOfAvailableDocs;

  const [otherUserDoc, setOtherUserDoc] = useState(null);

  useEffect(() => {
    getUserDocFromDb(null, username).then(setOtherUserDoc);
  }, []);

  return (
    <Box className="camera-roll">
      {otherUserDoc && (
        <Box>
          <Typography variant="h4" noWrap>
            {otherUserDoc.fullName} posts
          </Typography>
          <div>
            I am following:
            {otherUserDoc.following.map((followedId) => (
              <p>{followedId}</p>
            ))}
          </div>
          <div>
            My followers:
            {otherUserDoc.followers.map((followerId) => (
              <p>{followerId}</p>
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
    </Box>
  );
};

export default OtherUser;
