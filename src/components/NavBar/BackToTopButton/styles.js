import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    position: 'fixed',
    zIndex: 100,
    bottom: theme.spacing(14),
    right: theme.spacing(3),
  },

  arrowUpIcon: {
    color: theme.palette.common.white,
  },
}));
