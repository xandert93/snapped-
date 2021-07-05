import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    color: 'white',
    opacity: 0,
    transition: theme.transitions.create('opacity', { duration: '0.3s' }),
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
