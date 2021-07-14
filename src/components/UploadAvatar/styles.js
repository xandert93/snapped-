import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  avatar: {
    border: '3px solid ' + theme.palette.text.primary,
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: '0 auto',
  },

  label: {
    cursor: 'pointer',
  },
}));
