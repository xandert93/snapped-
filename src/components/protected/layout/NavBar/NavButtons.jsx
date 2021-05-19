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
import { useState, useEffect, useRef } from 'react';

const NavButtons = ({ isMobile, toggleDrawer, validateFile, fileInfo }) => {
  const classes = useStyles();
  const { logout } = useContext(authContext);

  const fileInputRef = useRef();

  return (
    <div
      className={classes[isMobile ? 'navButtonsMob' : 'navButtons']}
      onClick={() => {
        if (!isMobile) return;
        toggleDrawer();
      }}>
      <Button startIcon={<AddAPhoto />} style={{ position: 'relative' }}>
        <input
          type="file"
          id="file-input"
          style={{ display: 'none' }}
          ref={fileInputRef}
          value={fileInfo.path}
          onChange={(e) => {
            validateFile(e.target.files[0]);
            if (!isMobile) return;
            toggleDrawer();
          }}
        />
        <label
          htmlFor="file-input"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            cursor: 'pointer',
          }}
        />
        Upload
      </Button>
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
