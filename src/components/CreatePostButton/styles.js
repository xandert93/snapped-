import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    //TEMPORARY:
    [theme.breakpoints.down('xs')]: {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      height: theme.spacing(7),
      width: theme.spacing(7),
    },
  },

  addPhotoIcon: {
    fontSize: theme.spacing(5),
    //TEMPORARY:
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(4),
    },
    paddingRight: 2,
  },

  fileInput: {
    display: 'none',
  },

  fileInputLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: 'pointer',
  },
}));
