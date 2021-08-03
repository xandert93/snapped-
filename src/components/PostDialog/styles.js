import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  appBar: {
    backgroundImage: `linear-gradient(310deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
  },

  toolbar: {
    '& :nth-child(2)': {
      flexGrow: 1,
      marginLeft: theme.spacing(4),
      [theme.breakpoints.down('xs')]: {
        marginLeft: theme.spacing(3),
      },
    },

    '& svg': {
      [theme.breakpoints.up('sm')]: {
        fontSize: theme.spacing(4),
      },
    },
  },
}));
