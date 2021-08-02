import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  avatar: {
    border: '3px solid ' + theme.palette.text.primary,
    transition: theme.transitions.create('border-color', { duration: theme.transitions.duration.shortest }),
    '&:hover': {
      borderColor: theme.palette.primary.light,
    },
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: '0 auto',
  },

  label: {
    cursor: 'pointer',
  },
}));
