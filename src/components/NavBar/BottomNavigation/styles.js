import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  bottomNavigation: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1200,

    '& svg': {
      fontSize: theme.spacing(5),
      [theme.breakpoints.down('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },

    '& .MuiBottomNavigationAction-root.MuiBottomNavigationAction-iconOnly, & .MuiBottomNavigationAction-root.Mui-selected':
      {
        paddingTop: 0, //16px* nearly impossible to get rid of
      },
  },

  avatar: {
    border: '2px solid currentColor', //element's "color" inherit's from parent. Access this with "currentColor"
    height: theme.spacing(5),
    width: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      height: theme.spacing(3.5),
      width: theme.spacing(3.5),
    },
  },
}));
