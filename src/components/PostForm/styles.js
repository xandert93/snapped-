import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2.5),
    },
    '& input, textarea, em': {
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(2),
      },
    },
  },
  imageBox: {
    textAlign: 'center',
    overflow: 'hidden',
  },
  image: {
    maxWidth: '100vw',
    maxHeight: '45vh',
    margin: theme.spacing(-5, 0),
  },

  submitButtonBox: {
    position: 'absolute',
    top: theme.spacing(1.7),
    right: theme.spacing(1.7),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.only('xs')]: {
      paddingRight: theme.spacing(0.8),
    },
    zIndex: 3000,

    '& svg': {
      fontSize: theme.spacing(5),
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
}));
