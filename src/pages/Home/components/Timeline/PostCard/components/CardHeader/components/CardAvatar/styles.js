import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  cardAvatar: {
    borderRadius: '10px 3px 3px',
    [theme.breakpoints.down('xs')]: {
      borderRadius: '50%',
    },
  },
}));
