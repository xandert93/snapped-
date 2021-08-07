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

import { buildProfilePath, ROUTES } from '../../constants/routes';
import BackToTopFAB from './BackToTopFAB/BackToTopFAB';
import { AccountCircle, ExitToApp, Notifications, Settings } from '@material-ui/icons';
import { PostCreationFAB } from '../PostCreationFAB';
import { useDispatch, useSelector } from 'react-redux';
import { BottomNavigation } from './BottomNavigation';
import { SearchBar } from './SearchBar';
import { IconButton, Badge } from '@material-ui/core';
import { Link } from '../Link';
import { userProfilePicURLSelector, selectUserUsername } from '../../state/auth/selectors';
import { setConfirmationDialog } from '../../state/app/actions';
import { SideDrawer } from './SideDrawer';
import { logoutDialogData } from './logoutDialogData';

export default function NavBar({ reader }) {
  const userUsername = useSelector(selectUserUsername);
  const userProfilePicURL = useSelector(userProfilePicURLSelector);
  const isVPmaxSm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm')); //is viewport width less than 768px
  const isVPmaxMd = useMediaQuery(({ breakpoints }) => breakpoints.down('md'));
  const isVPminLg = useMediaQuery(({ breakpoints }) => breakpoints.up('lg'));
  const classes = useStyles({ isVPmaxSm, isVPmaxMd });

  const isScrolledDown = useScrollTrigger({ target: window, threshold: 100 });

  const dispatch = useDispatch();

  const handleLogoutClick = () => dispatch(setConfirmationDialog(logoutDialogData));

  return (
    <>
      <Slide in={!isScrolledDown} timeout={500}>
        <AppBar className={classes.appBar} color="inherit">
          <Toolbar className={classes.toolbar}>
            <Box className={classes.headingButtonBox}>
              {isVPmaxMd && <SideDrawer />}

              <Button disabled={isVPmaxSm} component={Link} to={ROUTES.HOME}>
                <img src={logo} alt="snapped!" className={classes.logoImg} />
                {!isVPmaxMd && (
                  <Typography variant="h4" component="h1" className={classes.headingPrimary}>
                    snapped!
                  </Typography>
                )}
              </Button>
            </Box>

            {!isVPmaxSm && <SearchBar />}

            <Box className={classes.actionsBox}>
              <IconButton className={classes.notificationButton}>
                <Badge
                  // badgeContent={1}
                  color="secondary"
                  variant="dot">
                  <Notifications />
                </Badge>
              </IconButton>

              {!isVPmaxSm && (
                <IconButton>
                  <Link to={buildProfilePath(userUsername)}>
                    <Avatar src={userProfilePicURL} className={classes.avatar}>
                      <AccountCircle />
                    </Avatar>
                  </Link>
                </IconButton>
              )}

              {isVPminLg && (
                <>
                  <IconButton>
                    <Link to={ROUTES.ACCOUNT}>
                      <Settings />
                    </Link>
                  </IconButton>
                  <IconButton edge="end" color="secondary" onClick={handleLogoutClick}>
                    <ExitToApp />
                  </IconButton>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar className={classes.topNavSpacer} />

      {!isVPmaxSm && <BackToTopFAB isScrolledDown={isScrolledDown} />}
      <PostCreationFAB reader={reader} isScrolledDown={isScrolledDown} />

      {isVPmaxSm && <BottomNavigation />}
    </>
  );
}

/*
<ListItem> outputs <li>. Passing Boolean "button" prop turns this to <div> which ripples and uses "cursor:pointer"

*/
