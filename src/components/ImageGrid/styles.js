import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  imageWrap: {
    position: 'relative',
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
  },
}));
