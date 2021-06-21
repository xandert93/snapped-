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
}));
