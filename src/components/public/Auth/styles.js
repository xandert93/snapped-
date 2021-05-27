import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  layout: {
    height: 'calc(100vh - 16px)',
    display: 'flex',
    padding: `0 ${theme.spacing(3)}px`,
    [theme.breakpoints.down('xs')]: {
      padding: 0,
    },
    // [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
    //   width: 600,
    //   marginLeft: 'auto',
    //   marginRight: 'auto',
    // },
  },

  themeSwitchBox: {
    position: 'absolute',
    top: 0,
    right: 0,
  },

  formPaper: {
    margin: 'auto',
    width: '100%',
    maxWidth: 500, //width + maxWidth were really important gor getting inputs to be predictable in width
    textAlign: 'center',
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
      boxShadow: 'none',
    },
    // [theme.breakpoints.down('xs')]: {
    //   width: '100%',
    //   marginTop: 60,
    // },
    // [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
    //   marginTop: theme.spacing(6),
    //   marginBottom: theme.spacing(6),
    //   padding: theme.spacing(3),
    // },
    position: 'relative',
  },

  form: {
    '& > *:not(:first-child)': {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1),
      },
    },
  },

  logoImg: {
    width: '50%',
    maxWidth: 180,
    margin: '-10px 0 -5px',
  },

  stepperFields: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1),
      },
    },
  },

  btnSubmit: {
    letterSpacing: 3,
    [theme.breakpoints.down('xs')]: {
      letterSpacing: 2,
    },
    '&:hover': {
      backgroundColor: theme.palette.secondary.dark,
    },
  },

  redirectLink: {
    textDecoration: 'none',
    fontWeight: 600,
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark,
      textDecoration: 'underline',
    },
  },
}));
