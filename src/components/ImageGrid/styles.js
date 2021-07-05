import { makeStyles, fade } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    backgroundColor: fade(theme.palette.background.paper, 0.3),
  },

  tile: {
    cursor: 'pointer',
  },

  // imageWrap: {
  //   position: 'relative',
  // },

  // imageBox: {
  //   height: 0,
  //   paddingBottom: '100%',
  //   overflow: 'hidden',
  //   borderRadius: 2,
  //   cursor: 'pointer',

  //   position: 'relative',
  // },

  // image: {
  //   width: '100%',

  //   position: 'absolute',
  //   left: '50%',
  //   top: '50%',
  //   transform: 'translate(-50%, -50%)',
  // },
}));
