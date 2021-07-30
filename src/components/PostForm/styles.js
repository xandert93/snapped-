import { makeStyles } from '@material-ui/core';

export default makeStyles(
  (theme) => ({
    form: {
      padding: theme.spacing(2),
      '& > *:not(:last-child)': {
        marginBottom: theme.spacing(2.5),
      },
      '& input, textarea, em': {
        [theme.breakpoints.down('xs')]: {
          fontSize: theme.spacing(2),
        },
      },
    },
    imageBox: {
      textAlign: 'center',
      overflow: 'hidden',
    },
    image: {
      maxWidth: '100vw',
      maxHeight: '45vh',
      margin: theme.spacing(-5, 0),
    },

    //has own styling from package that will clash with these. {index: 1} included at bottom
    chipInputHelperText: {
      marginTop: theme.spacing(1),
      marginBottom: 0, //*-20px for some reason
      color: theme.palette.secondary.light,
    },

    submitButtonBox: {
      position: 'absolute',
      top: theme.spacing(1.7),
      right: theme.spacing(1.7),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.only('xs')]: {
        paddingRight: theme.spacing(0.8),
      },
      zIndex: 3000,

      '& svg': {
        fontSize: theme.spacing(5),
        [theme.breakpoints.only('xs')]: {
          fontSize: theme.spacing(3.5),
        },
      },
    },
  }),
  { index: 1 }
);
