import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  redirectLink: {
    textDecoration: 'none',
    fontWeight: 600,
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline',
    },
  },
}));
