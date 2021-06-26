import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(14),
    right: theme.spacing(3),
  },

  arrowUpIcon: {
    fontSize: theme.spacing(5),
    color: theme.palette.common.white,
  },
}));
