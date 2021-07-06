import { useContext } from 'react';
import { authContext } from '../../../contexts/1.auth/authContext';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from '../styles';
import { Box, Button, Divider } from '@material-ui/core';
import { AccountCircle, CameraRoll, ExitToApp } from '@material-ui/icons';

import { ROUTES } from '../../../constants/routes';

const NavButtons = ({ isVPsm, toggleDrawer }) => {
  const classes = useStyles();
  const { logout, user } = useContext(authContext);

  return (
    <Box
      className={classes[isVPsm ? 'navButtonsMob' : 'navButtons']}
      onClick={() => {
        if (!isVPsm) return;
        toggleDrawer();
      }}>
      <Button
        component={RouterLink}
        to={`/p/${user.username}`}
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
    </Box>
  );
};

export default NavButtons;
