import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('md')]: {
      minHeight: 100,
    },
    [theme.breakpoints.down('md')]: {
      minHeight: 86,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 72,
    },
  },
  toolbar: {
    [theme.breakpoints.up('md')]: {
      minHeight: 100,
    },
    [theme.breakpoints.down('md')]: {
      minHeight: 86,
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: 72,
    },
  },
  logoImg: {
    width: 80,
    marginRight: 12,
    [theme.breakpoints.down('md')]: {
      width: 70,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      width: 60,
    },
  },
  heading: {
    textTransform: 'lowercase',
  },
  grow: {
    flexGrow: 1,
  },
}));
