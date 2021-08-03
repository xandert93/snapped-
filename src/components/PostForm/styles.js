import { makeStyles } from '@material-ui/core';

export default makeStyles(
  (theme) => ({
    //   form: {
    //     padding: theme.spacing(2),
    //     '& > *:not(:last-child)': {
    //       marginBottom: theme.spacing(2.5),
    //     },
    //     '& input, textarea, em': {
    //       [theme.breakpoints.down('xs')]: {
    //         fontSize: theme.spacing(2),
    //       },
    //     },
    //   },
    imageBox: {
      overflow: 'hidden',
      width: '100%',

      '& > img': {
        objectFit: 'cover',
        width: '100%',
        maxHeight: '45vh',
        borderRadius: theme.shape.borderRadius,
      },
    },

    //has own styling from package that will clash with these. {index: 1} included at bottom
    chipInputHelperText: {
      marginTop: theme.spacing(1),
      marginBottom: 0, //*-20px for some reason
      color: theme.palette.secondary.light,
    },
  }),
  { index: 1 }
);
