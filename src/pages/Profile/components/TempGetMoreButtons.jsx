import React from 'react';
import { Box, Button } from '@material-ui/core';

const TempGetMoreButtons = ({
  posts,
  noOfPosts,
  noOfReqdPosts,
  setNoOfReqdPosts,
}) => {
  const arePostsExhausted = noOfReqdPosts === noOfPosts;
  return (
    !!posts?.length && (
      <Box style={{ textAlign: 'center' }}>
        <Button
          disabled={arePostsExhausted}
          variant="contained"
          color="secondary"
          onClick={() => setNoOfReqdPosts((x) => x + 6)}>
          Fetch 6
        </Button>
        <Button
          disabled={arePostsExhausted}
          variant="contained"
          color="secondary"
          onClick={() => setNoOfReqdPosts(noOfPosts)}>
          Fetch {noOfPosts}
        </Button>
      </Box>
    )
  );
};

export default TempGetMoreButtons;
