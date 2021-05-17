import React, { useContext } from 'react';
import authContext from '../../../../contexts/auth/authContext';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './styles';
import { Button, Divider } from '@material-ui/core';
import {
  AccountCircle,
  AddAPhoto,
  CameraRoll,
  ExitToApp,
} from '@material-ui/icons';

const NavButtons = ({ isMobile, toggleDrawer }) => {
  const classes = useStyles();
  const { logout } = useContext(authContext);
  const styling = isMobile ? classes.navButtonsMob : classes.navButtons;
  return (
    <div
      className={styling}
      onClick={() => {
        if (!isMobile) return;
        toggleDrawer();
      }}>
      <Button startIcon={<AddAPhoto />}>Upload</Button>
      {isMobile && <Divider />}
      <Button
        component={RouterLink}
        to="/camera-roll"
        startIcon={<CameraRoll />}>
        Camera Roll
      </Button>
      {isMobile && <Divider />}
      <Button
        component={RouterLink}
        to="/my-account"
        startIcon={<AccountCircle />}>
        My Account
      </Button>
      {isMobile && <Divider />}
      <Button
        variant="contained"
        color="secondary"
        onClick={logout}
        startIcon={<ExitToApp />}>
        Logout
      </Button>
    </div>
  );
};

export default NavButtons;
