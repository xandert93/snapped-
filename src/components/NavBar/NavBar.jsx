import { useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ConditionalWrapper from './ConditionalWrapper';
import { NavButtons } from './NavButtons';
import useStyles from './styles';
import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import logo from '../../assets/images/snapped.ico';

import { ROUTES } from '../../constants/routes';
import { appContext } from '../../contexts/3.app/appContext';
import { ThemeSwitch } from '../ThemeSwitch';
import { useRef } from 'react';

let scrollFromTop = window.pageYOffset;

const NavBar = () => {
  const { innerWidth } = useContext(appContext);

  const isMobile = innerWidth < 960;
  const classes = useStyles({ isMobile });

  const appBarRef = useRef();
  useEffect(() => {
    window.addEventListener('scroll', navScroll);

    function navScroll() {
      let newScrollFromTop = window.pageYOffset;
      appBarRef.current.style.top =
        newScrollFromTop > scrollFromTop ? '-67px' : '0px';
      scrollFromTop = newScrollFromTop;
    }

    return () => window.removeEventListener('scroll', navScroll);
  }, []);

  return (
    <>
      <AppBar
        ref={appBarRef}
        elevation={0}
        className={classes.appBar}
        color="inherit">
        <Toolbar className={classes.toolbar}>
          <Box className={classes.headingButtonBox}>
            <Button component={RouterLink} to={ROUTES.HOME}>
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
          </Box>

          <Box className={classes.themeSwitchBox}>
            <ThemeSwitch />
          </Box>

          <Box>
            <ConditionalWrapper isMobile={isMobile}>
              <NavButtons />
            </ConditionalWrapper>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
