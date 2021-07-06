import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: ({ isVPxs, isVPsm }) => ({
    position: 'fixed',
    zIndex: 100,
    bottom: theme.spacing(isVPxs ? 9 : isVPsm ? 10 : 3),
    right: theme.spacing(isVPsm ? 2 : 3),
  }),

  fab: ({ isVPxs, isVPsm }) => ({
    height: theme.spacing(isVPxs ? 7 : isVPsm ? 8 : 9),
    width: theme.spacing(isVPxs ? 7 : isVPsm ? 8 : 9),
  }),

  addPhotoIcon: ({ isVPsm, isVPxs }) => ({
    fontSize: theme.spacing(isVPxs ? 4 : isVPsm ? 4.5 : 5),
    paddingRight: 2,
  }),

  // fileInput: {
  //   display: 'none',
  // },

  //instead of using display none, we can just pass the global hidden attribute - see MDN

  fileInputLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    cursor: 'pointer',
  },
}));
