import React, { useContext } from 'react';
import authContext from '../../../../contexts/auth/authContext';
import { Link as RouterLink } from 'react-router-dom';
import ConditionalWrapper from './ConditionalWrapper';
import NavButtons from './NavButtons';
import useStyles from './styles';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import logo from '../../../../assets/snapped.ico';

const NavBar = ({ validateFile, fileInfo, innerWidth }) => {
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
          <div className={classes.grow} />

          {currentUser && (
            <ConditionalWrapper innerWidth={innerWidth}>
              <NavButtons {...{ validateFile, fileInfo }} />
            </ConditionalWrapper>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </>
  );
};

export default NavBar;
