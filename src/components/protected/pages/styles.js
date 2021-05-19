import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  main: {
    height: '90vh',
  },

  containerHidden: {
    display: 'none',
  },
  dragged: {
    borderRadius: 3,
    border: '5px dashed red',
    margin: '3px -5px',
  },
  uploadIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 200,
    zIndex: -1,
  },
}));
