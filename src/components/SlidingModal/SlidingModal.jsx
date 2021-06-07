import React from 'react';
import useStyles from './styles';
import {
  AppBar,
  Dialog,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const SlidingModal = ({ showModal, closeModal, modalHeading, children }) => {
  const classes = useStyles();

  return (
    <Dialog open={showModal} fullScreen TransitionComponent={Slide}>
      <AppBar color="secondary">
        <Toolbar>
          <IconButton color="inherit" onClick={closeModal}>
            <Close />
          </IconButton>
          <Typography variant="h5">{modalHeading}</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
      {children}
    </Dialog>
  );
};

export default SlidingModal;
