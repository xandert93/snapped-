import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
    background: `linear-gradient(130deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
  },

  bottomNavSpacer: {
    height: 64,
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
