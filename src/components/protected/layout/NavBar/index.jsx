import React, { useContext } from 'react';
import authContext from '../../../../contexts/1.auth/authContext';
import { Link as RouterLink } from 'react-router-dom';
import ConditionalWrapper from './ConditionalWrapper';
import NavButtons from './NavButtons';
import useStyles from './styles';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import logo from '../../../../assets/snapped.ico';
import ThemeSwitch from '../ThemeSwitch';
import { ROUTES } from '../../../../constants/routes';
import { appContext } from '../../../../contexts/3.app/appContext';

const NavBar = () => {
  const classes = useStyles();
  const { currentUserDoc } = useContext(authContext);
  const { innerWidth } = useContext(appContext);

  const isMobile = innerWidth < 960;

  return (
    <>
      <AppBar className={classes.appBar} color="inherit">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          {isMobile && (
            <Box style={{ order: '2' }}>
              <ThemeSwitch />
            </Box>
          )}

          <Button
            component={RouterLink}
            to={ROUTES.HOME}
            style={{ order: isMobile ? '1' : '0' }}
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

          {/*duplicate switch cos me lazy*/}
          {!isMobile && (
            <Box>
              <ThemeSwitch />
            </Box>
          )}

          {!isMobile && <div className={classes.grow} />}

          {currentUserDoc && (
            <ConditionalWrapper isMobile={isMobile}>
              <NavButtons />
            </ConditionalWrapper>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbar} />
    </>
  );
};

export default NavBar;