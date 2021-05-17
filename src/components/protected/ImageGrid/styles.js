import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  imagesContainer: {
    margin: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      padding: '.5rem',
    },
    [theme.breakpoints.up('md')]: {
      padding: '1rem',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '1.5rem',
    },
  },
}));
