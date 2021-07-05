import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },

  backButton: {
    padding: theme.spacing(0, 1),
    '& svg': {
      fontSize: theme.spacing(5),
      [theme.breakpoints.only('xs')]: {
        fontSize: theme.spacing(3.5),
      },
    },
  },
}));
