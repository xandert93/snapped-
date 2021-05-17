import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import authContext from '../../../contexts/auth/authContext';
import ConditionalWrapper from './ConditionalWrapper';
import NavButtons from './NavButtons/NavButtons';
import useStyles from './styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import logo from '../../../assets/snapped.ico';

const Navbar = ({ innerWidth }) => {
  const classes = useStyles();
  const { currentUser } = useContext(authContext);

  return (
    <>
      <AppBar className={classes.appBar} color="inherit">
        <Toolbar>
          <Button component={RouterLink} to="/" disableRipple>
            <img src={logo} alt="snapped!" className={classes.logoImg} />
            <Typography variant="h4" component="h1" className={classes.heading}>
              snapped!
            </Typography>
          </Button>
          <div className={classes.grow}></div>

          {currentUser && (
            <ConditionalWrapper innerWidth={innerWidth}>
              <NavButtons />
            </ConditionalWrapper>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </>
  );
};

export default Navbar;
