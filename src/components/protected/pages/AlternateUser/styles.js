import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },

  imageBox: {
    height: 0,
    paddingBottom: '100%',
    overflow: 'hidden',
    borderRadius: 2,

    position: 'relative',
  },

  image: {
    width: '100%',

    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',

    opacity: '0.9',
    filter: 'grayscale(50%)',
    '&:hover': {
      cursor: 'pointer',
      filter: 'initial',
      opacity: '1',
    },
  },
}));
