import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  main: {
    padding: theme.spacing(2),

    [theme.breakpoints.down('sm')]: {
      // minHeight: `calc(100vh - ${theme.spacing(8)})`,
      paddingBottom: theme.spacing(8), //account for sm bottomNavigation of 64px height
    },
    [theme.breakpoints.down('xs')]: {
      // minHeight: `calc(100vh - ${theme.spacing(7)})`,
      padding: 0,
      paddingBottom: theme.spacing(7), //account for xs bottomNavigation of 56px height
    },

    '&::before': {
      content: '""',
      backgroundImage: `linear-gradient(130deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      willChange: 'transform',
      zIndex: -1000,
    },
  },

  //main needs a temp height for now for the drag and drop
  //or the way i've set it up...look at mp3 cutter which overlays main content
  // main: {
  //   minHeight: '5vh',
  // },
  // container: { display: 'initial' },
  // containerHidden: {
  //   display: 'none',
  // },
  // dragged: {
  //   borderRadius: 3,
  //   border: '5px dashed red',
  //   margin: '3px -5px',
  // },
  // uploadIcon: {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   fontSize: 200,
  //   zIndex: -1,
  // },
}));
