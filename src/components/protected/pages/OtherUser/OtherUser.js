import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useDb from '../../../../custom-hooks/useDb';

const OtherUser = () => {
  const { userId } = useParams();

  const [numOfRequestedDocs, setNumOfRequestedDocs] = useState(1);

  const [userImageDocs, numOfAvailableDocs] = useDb(
    'Image URL Data',
    numOfRequestedDocs,
    userId
  );

  const noMoreImageDocs = numOfRequestedDocs === numOfAvailableDocs;

  return (
    <Box className="camera-roll">
      <Typography variant="h4" noWrap>
        {userId}'s posts
      </Typography>
      {userImageDocs.map(({ id, url }, idx) => (
        <img key={id} src={url} data-index={idx} alt="" />
      ))}
      {userImageDocs.length > 0 && (
        <Box style={{ textAlign: 'center' }}>
          <Button
            disabled={noMoreImageDocs}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs((x) => x + 1)}>
            Fetch One More
          </Button>
          <Button
            disabled={noMoreImageDocs}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs(numOfAvailableDocs)}>
            Fetch All (~{numOfAvailableDocs * 3.5}MB?)
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default OtherUser;
