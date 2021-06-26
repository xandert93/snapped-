import { useContext } from 'react';
import { authContext } from '../../../contexts/1.auth/authContext';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from '../styles';
import { Button, Divider } from '@material-ui/core';
import { AccountCircle, CameraRoll, ExitToApp } from '@material-ui/icons';

import { ROUTES } from '../../../constants/routes';

const NavButtons = ({ isVPsm, toggleDrawer }) => {
  const classes = useStyles();
  const { logout, currentUserDoc } = useContext(authContext);

  return (
    <div
      className={classes[isVPsm ? 'navButtonsMob' : 'navButtons']}
      onClick={() => {
        if (!isVPsm) return;
        toggleDrawer();
      }}>
      <Button
        component={RouterLink}
        to={`/p/${currentUserDoc.username}`}
        startIcon={<CameraRoll />}>
        My Profile
      </Button>
      {isVPsm && <Divider />}
      <Button
        component={RouterLink}
        to={ROUTES.ACCOUNT}
        startIcon={<AccountCircle />}>
        My Account
      </Button>
      {isVPsm && <Divider />}
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
