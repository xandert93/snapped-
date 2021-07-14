import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  stepperFields: {
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        marginBottom: theme.spacing(1),
      },
    },
  },

  actionButtons: {
    marginTop: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
    },
  },
}));
