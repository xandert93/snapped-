import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  progressBox: {
    height: 'calc(100vh - 72px)',
    display: 'flex',
    position: 'relative',
  },

  progressCircle: {
    margin: 'auto',
  },

  captionBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));
