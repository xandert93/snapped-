import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    display: 'flex',
    //above 578px width, <main> receives paddingTop & paddingBottom of theme.spacing(2)
    height: `calc(100vh - ${theme.spacing(4)}px)`,

    [theme.breakpoints.down('xs')]: {
      height: '100vh',
      background: theme.palette.background.paper,
    },
  },

  formPaper: {
    margin: 'auto',
    width: '100%',
    maxWidth: 500, //width + maxWidth were really important for getting inputs to be predictable in width
    textAlign: 'center',
    padding: theme.spacing(4),

    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      boxShadow: 'none',
      borderRadius: 0,
    },

    position: 'relative',
  },

  themeSwitchBox: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
