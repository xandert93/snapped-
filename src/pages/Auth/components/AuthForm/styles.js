import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
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
    [theme.breakpoints.down('sm')]: {
      width: '30%',
    },
    maxWidth: 180,
    margin: '-10px 0 -5px',
  },
}));
