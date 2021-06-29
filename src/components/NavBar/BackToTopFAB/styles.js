import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: ({ isVPsm }) => ({
    position: 'fixed',
    zIndex: 100,
    bottom: theme.spacing(isVPsm ? 10 : 3),
    right: theme.spacing(3),
  }),
  arrowUpIcon: {
    color: theme.palette.common.white,
  },
}));
