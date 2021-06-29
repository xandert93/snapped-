import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 100,
    [theme.breakpoints.up('xs')]: {
      padding: theme.spacing(2, 1),
    },

    '& .MuiBottomNavigationAction-iconOnly': {
      color: theme.palette.text.primary,
    },

    '& .Mui-selected': {
      color: theme.palette.secondary.main,
    },

    '& svg': {
      fontSize: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
}));
