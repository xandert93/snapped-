import { Link as RouterLink } from 'react-router-dom';
import ConditionalWrapper from './ConditionalWrapper';
import { NavButtons } from './NavButtons';
import useStyles from './styles';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  InputBase,
  Toolbar,
  Typography,
  Slide,
  useScrollTrigger,
  useMediaQuery,
  ListItem,
} from '@material-ui/core';
import logo from '../../assets/images/snapped.ico';

import { ROUTES } from '../../constants/routes';
import { ThemeSwitch } from '../ThemeSwitch';
import BackToTopFAB from './BackToTopFAB/BackToTopFAB';
import {
  AccountCircle,
  Brightness4,
  ContactSupport,
  ExitToApp,
  Favorite,
  Folder,
  Inbox,
  Restore,
  LocationOn,
  Menu,
  Notifications,
  Search,
  Settings,
} from '@material-ui/icons';
import { CreatePostFAB } from '../CreatePostFAB';
import React, { useContext, useState } from 'react';
import { authContext } from '../../contexts/1.auth/authContext';
import BottomNav from './BottomNav/BottomNav';
import {
  IconButton,
  SwipeableDrawer,
  List,
  ListItemIcon,
  ListItemText,
  Badge,
  Divider,
} from '@material-ui/core';

const NavBar = () => {
  const { logout } = useContext(authContext);
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm')); //is viewport width less than 768px
  const isVPmd = useMediaQuery(({ breakpoints }) => breakpoints.down('md'));
  const classes = useStyles({ isVPsm, isVPmd });

  const isScrolledDown = useScrollTrigger({ target: window, threshold: 100 });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (newState) => () => setIsDrawerOpen(newState);

  //refactor into [].map()
  function zeList() {
    return (
      <Box className={classes.drawerContentBox}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Brightness4 />
            </ListItemIcon>
            <ThemeSwitch />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Settings color="primary" />
            </ListItemIcon>
            <ListItemText primary="settings" secondary="change shit" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ContactSupport className={classes.contactSVG} />
            </ListItemIcon>
            <ListItemText
              primary="contact us"
              secondary="tissues for ur issues"
            />
          </ListItem>
          <Divider />
          <ListItem button onClick={logout}>
            <ListItemIcon>
              <ExitToApp color="secondary" />
            </ListItemIcon>
            <ListItemText primary="logout" secondary="ruuuuude" />
          </ListItem>
        </List>
      </Box>
    );
  }

  return (
    <>
      <Slide in={!isScrolledDown} timeout={500}>
        <AppBar elevation={0} className={classes.appBar} color="inherit">
          <Toolbar className={classes.toolbar}>
            <Box className={classes.headingButtonBox}>
              {isVPmd && (
                <>
                  <IconButton onClick={toggleDrawer(true)}>
                    <Menu color="secondary" />
                  </IconButton>
                  <SwipeableDrawer
                    anchor="left"
                    open={isDrawerOpen}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}>
                    {zeList()}
                  </SwipeableDrawer>
                </>
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
