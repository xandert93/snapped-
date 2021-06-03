import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },

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

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    color: 'white',
    opacity: 0,
    '&:hover': {
      opacity: 1,
      cursor: 'pointer',
    },

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginRight: theme.spacing(1),
    },
  },

  overlayIcon: {
    verticalAlign: -5,
  },
}));
