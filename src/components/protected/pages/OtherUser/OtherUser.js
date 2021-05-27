import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useDb from '../../../../hooks/useDb';

const OtherUser = () => {
  const { userId } = useParams();

  const [numOfRequestedDocs, setNumOfRequestedDocs] = useState(1);

  const [usersImageDocs, numOfAvailableDocs] = useDb('Image URL Data', userId);

  const noMoreImageDocs = numOfRequestedDocs === numOfAvailableDocs;

  return (
    <Box className="camera-roll">
      <Typography variant="h4" noWrap>
        {userId}'s posts
      </Typography>

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
