import { Button, ButtonGroup } from '@material-ui/core';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../contexts/auth/authContext';

const Navbar = () => {
  const { logout } = useContext(authContext);

  return (
    <ButtonGroup variant="contained">
      <Link to="/">
        <Button>Home</Button>
      </Link>{' '}
      <Link to="/camera-roll">
        <Button>Camera Roll</Button>
      </Link>{' '}
      <Link to="/my-account">
        <Button>My Account</Button>
      </Link>{' '}
      <Button onClick={logout}>Logout</Button>
    </ButtonGroup>
  );
};

export default Navbar;
