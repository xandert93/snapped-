import { fade, makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    padding: theme.spacing(1),
    background: fade(theme.palette.background.paper, 0.8),
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  avatar: {
    border: '3px solid ' + theme.palette.text.primary,
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: '0 auto',
  },
}));
