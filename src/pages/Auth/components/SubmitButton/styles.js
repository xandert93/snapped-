import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  submitButton: {
    letterSpacing: 3,
    [theme.breakpoints.down('xs')]: {
      letterSpacing: 2,
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));
