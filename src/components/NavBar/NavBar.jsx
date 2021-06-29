import { Link as RouterLink } from 'react-router-dom';
import ConditionalWrapper from './ConditionalWrapper';
import { NavButtons } from './NavButtons';
import useStyles from './styles';
import {
  AppBar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  InputBase,
  InputAdornment,
  Toolbar,
  Typography,
  Slide,
  useScrollTrigger,
  useMediaQuery,
} from '@material-ui/core';
import logo from '../../assets/images/snapped.ico';

import { ROUTES } from '../../constants/routes';
import { ThemeSwitch } from '../ThemeSwitch';
import BackToTopFAB from './BackToTopFAB/BackToTopFAB';
import { Badge } from '@material-ui/core';
import {
  Notifications,
  AccountCircle,
  Search,
  Settings,
  ExitToApp,
  Restore,
  Favorite,
  LocationOn,
  Folder,
  Menu,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';
import { CreatePostFAB } from '../CreatePostFAB';
import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/1.auth/authContext';
import BottomNav from './BottomNav/BottomNav';

const NavBar = () => {
  const { logout } = useContext(authContext);
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm')); //is viewport width less than 768px
  const isVPmd = useMediaQuery(({ breakpoints }) => breakpoints.down('md'));
  const classes = useStyles({ isVPsm, isVPmd });

  const isScrolledDown = useScrollTrigger({ target: window, threshold: 100 });

  return (
    <>
      <Slide in={!isScrolledDown} timeout={500}>
        <AppBar elevation={0} className={classes.appBar} color="inherit">
          <Toolbar className={classes.toolbar}>
            <Box className={classes.headingButtonBox}>
              {isVPmd && (
                <IconButton onClick={null}>
                  <Menu color="secondary" />
                </IconButton>
              )}
              <Button component={RouterLink} to={ROUTES.HOME}>
                <img src={logo} alt="snapped!" className={classes.logoImg} />
                {!isVPmd && (
                  <Typography variant="h4" component="h1">
                    snapped!
                  </Typography>
                )}
              </Button>
            </Box>

            {!isVPsm && (
              <Box className={classes.searchBox}>
                <InputBase
                  classes={{
                    root: classes.inputBaseRoot,
                    input: classes.input,
                  }}
                  placeholder={`🔍 Search users & topics!`}
                  fullWidth
                />
              </Box>
            )}

            <Box className={classes.actionsBox}>
              <IconButton className={classes.notificationButton}>
                <Badge
                  // badgeContent={1}
                  color="secondary"
                  variant="dot">
                  <Notifications />
                </Badge>
              </IconButton>
              {!isVPsm && (
                <IconButton>
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1325229157131890689/dWcfdxWS_400x400.jpg"
                    className={classes.avatar}>
                    <AccountCircle />
                  </Avatar>
                </IconButton>
              )}

              {!isVPmd && <ThemeSwitch />}

              {!isVPmd && (
                <IconButton>
                  <Settings />
                </IconButton>
              )}
              {!isVPmd && (
                <IconButton edge="end" color="secondary" onClick={logout}>
                  <ExitToApp />
                </IconButton>
              )}
            </Box>

            {/* <Box>
              <ConditionalWrapper isVPsm={isVPsm}>
                <NavButtons />
              </ConditionalWrapper>
            </Box> */}
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar />

      {!isVPsm && <BackToTopFAB isScrolledDown={isScrolledDown} />}
      <CreatePostFAB isScrolledDown={isScrolledDown} />

      {isVPsm && <BottomNav />}
    </>
  );
};

export default NavBar;
