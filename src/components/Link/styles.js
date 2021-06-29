import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  link: {
    '&:hover': {
      color: theme.palette.secondary.light,
    },
  },
}));
