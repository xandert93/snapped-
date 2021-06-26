import { Link as RouterLink } from 'react-router-dom';
import ConditionalWrapper from './ConditionalWrapper';
import { NavButtons } from './NavButtons';
import useStyles from './styles';
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Slide,
  useScrollTrigger,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import logo from '../../assets/images/snapped.ico';

import { ROUTES } from '../../constants/routes';
import { ThemeSwitch } from '../ThemeSwitch';
import { useRef } from 'react';
import BackToTopButton from './BackToTopButton/BackToTopButton';

const NavBar = () => {
  const { breakpoints } = useTheme();
  const isVPsm = useMediaQuery(breakpoints.down('sm')); //is viewport width less than 960px
  const classes = useStyles({ isVPsm });

  const isScrolledDown = useScrollTrigger({ target: window, threshold: 100 });

  const spacerRef = useRef();

  return (
    <>
      <Slide in={!isScrolledDown} timeout={500}>
        <AppBar elevation={0} className={classes.appBar} color="inherit">
          <Toolbar className={classes.toolbar}>
            <Box className={classes.headingButtonBox}>
              <Button component={RouterLink} to={ROUTES.HOME}>
                <img src={logo} alt="snapped!" className={classes.logoImg} />
                {!isVPsm && (
                  <Typography
                    variant="h4"
                    component="h1"
                    className={classes.heading}>
                    snapped!
                  </Typography>
                )}
              </Button>
            </Box>

            <Box className={classes.themeSwitchBox}>
              <ThemeSwitch />
            </Box>

            <Box>
              <ConditionalWrapper isVPsm={isVPsm}>
                <NavButtons />
              </ConditionalWrapper>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>
      <Toolbar ref={spacerRef} />

      {!isVPsm && (
        <BackToTopButton
          anchor={spacerRef.current}
          isScrolledDown={isScrolledDown}
        />
      )}
    </>
  );
};

export default NavBar;
