import React, { useContext } from 'react';
import authContext from '../../../../contexts/auth/authContext';
import { Link as RouterLink } from 'react-router-dom';
import ConditionalWrapper from './ConditionalWrapper';
import NavButtons from './NavButtons';
import useStyles from './styles';
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import logo from '../../../../assets/snapped.ico';
import { Menu } from '@material-ui/icons';

const NavBar = ({ validateFile, fileData, innerWidth }) => {
  const classes = useStyles();
  const { currentUser } = useContext(authContext);
  const isMobile = innerWidth < 960;

  return (
    <>
      <AppBar className={classes.appBar} color="inherit">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          {isMobile && (
            <IconButton style={{ order: '2' }}>
              <Menu fontSize="large" style={{ color: 'white' }} />
            </IconButton>
          )}

          <Button
            component={RouterLink}
            to="/"
            style={{ order: isMobile ? 1 : 0 }}
            disableRipple>
            <img src={logo} alt="snapped!" className={classes.logoImg} />
            {!isMobile && (
              <Typography
                variant="h4"
                component="h1"
                className={classes.heading}>
                snapped!
              </Typography>
            )}
          </Button>

          {!isMobile && <div className={classes.grow} />}

          {currentUser && (
            <ConditionalWrapper isMobile={isMobile}>
              <NavButtons {...{ validateFile, fileData }} />
            </ConditionalWrapper>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </>
  );
};

export default NavBar;
