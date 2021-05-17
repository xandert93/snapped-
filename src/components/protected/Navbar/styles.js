import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  logoImg: {
    width: 50,
    marginRight: 12,
  },
  heading: {
    textTransform: 'lowercase',
  },
  grow: {
    flexGrow: 1,
  },
}));
