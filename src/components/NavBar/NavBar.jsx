import { Link as RouterLink } from 'react-router-dom';
import ConditionalWrapper from './ConditionalWrapper';
import { NavButtons } from './NavButtons';
import useStyles from './styles';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography,
  Slide,
  useScrollTrigger,
  useMediaQuery,
} from '@material-ui/core';
import logo from '../../assets/images/snapped.ico';

import { ROUTES } from '../../constants/routes';
import { ThemeSwitch } from '../ThemeSwitch';
import BackToTopButton from './BackToTopButton/BackToTopButton';
import { Badge } from '@material-ui/core';
import {
  Notifications,
  AccountCircle,
  Settings,
  ExitToApp,
  Menu,
} from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const NavBar = () => {
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm')); //is viewport width less than 960px
  const classes = useStyles({ isVPsm });

  const isScrolledDown = useScrollTrigger({ target: window, threshold: 100 });

  return (
    <>
      <Slide in={!isScrolledDown} timeout={500}>
        <AppBar elevation={0} className={classes.appBar} color="inherit">
          <Toolbar className={classes.toolbar}>
            <Box className={classes.headingButtonBox}>
              {isVPsm && (
                <IconButton onClick={null}>
                  <Menu color="secondary" />
                </IconButton>
              )}
              <Button component={RouterLink} to={ROUTES.HOME}>
                <img src={logo} alt="snapped!" className={classes.logoImg} />
                <Typography
                  variant="h4"
                  component="h1"
                  className={classes.heading}>
                  snapped!
                </Typography>
              </Button>
            </Box>

            {/* <Box className={classes.themeSwitchBox}>
              <ThemeSwitch />
            </Box> */}

            {!isVPsm && <Box className={classes.grow} />}

            <Box>
              <IconButton className={classes.notificationButton}>
                <Badge
                  // badgeContent={1}
                  color="secondary"
                  variant="dot">
                  <Notifications />
                </Badge>
              </IconButton>
              {/* <IconButton>
                <Avatar
                  src="https://pbs.twimg.com/profile_images/1325229157131890689/dWcfdxWS_400x400.jpg"
                  className={classes.avatar}>
                  <AccountCircle fontSize="large" />
                </Avatar>
              </IconButton>
              <IconButton>
                <Settings fontSize="large" />
              </IconButton>
              <IconButton edge="end" color="secondary">
                <ExitToApp fontSize="large" />
              </IconButton> */}
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

      {!isVPsm && <BackToTopButton isScrolledDown={isScrolledDown} />}
    </>
  );
};

export default NavBar;
