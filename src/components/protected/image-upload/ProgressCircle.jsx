import { Box, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';

const ProgressCircle = ({ uploadProgress }) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        value={uploadProgress}
        color={uploadProgress !== 100 ? 'secondary' : 'primary'}
        size="10rem"
      />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Typography
          variant="caption"
          component="div"
          color="textSecondary">{`${Math.round(uploadProgress)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
