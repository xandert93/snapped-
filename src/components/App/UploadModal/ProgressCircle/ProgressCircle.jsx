import { Box, CircularProgress, Typography } from '@material-ui/core';

import useStyles from './styles';

const ProgressCircle = ({ uploadProgress }) => {
  const classes = useStyles();

  return (
    <Box className={classes.progressBox}>
      <CircularProgress
        className={classes.progressCircle}
        variant="determinate"
        value={uploadProgress}
        color={uploadProgress !== 100 ? 'secondary' : 'primary'}
        size="10rem"
      />
      <Box className={classes.captionBox}>
        <Typography
          variant="caption"
          component="div"
          color="textSecondary">{`${Math.round(uploadProgress)}%`}</Typography>
      </Box>
    </Box>
  );
};

export default ProgressCircle;
