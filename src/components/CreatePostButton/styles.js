import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  root: ({ isVPxs }) => ({
    position: 'fixed',
    bottom: theme.spacing(isVPxs ? 2 : 3),
    right: theme.spacing(isVPxs ? 2 : 3),
  }),

  fab: ({ isVPxs }) =>
    isVPxs && { height: theme.spacing(7), width: theme.spacing(7) },

  addPhotoIcon: ({ isVPxs }) => ({
    fontSize: theme.spacing(isVPxs ? 4 : 5),
    paddingRight: 2,
  }),

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
