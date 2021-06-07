import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  modal: {
    position: 'fixed',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
  },
  modalBody: {
    margin: 'auto',
    background: 'white',
    textAlign: 'center',
    background: 'transparent',
    //factor in toolbar when i can
  },

  modalImg: {
    //height: auto*; width: auto*
    maxHeight: '80vh',
    maxWidth: '80vw',
    //width and height auto up until this point
    borderRadius: 10,
    border: '4px solid white',
  },
}));
