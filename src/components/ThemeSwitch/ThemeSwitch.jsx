import { Box, Switch, IconButton } from '@material-ui/core';
import { Brightness4, NightsStay, WbSunny } from '@material-ui/icons';
import React, { useContext } from 'react';
import { appContext } from '../../contexts/3.app/appContext';
import useStyles from './styles';

const ThemeSwitch = () => {
  const classes = useStyles();
  const { darkMode, toggleDarkMode } = useContext(appContext);

  return <Switch checked={darkMode} onChange={toggleDarkMode} />;

  return (
    <Box>
      <IconButton onClick={toggleDarkMode}>
        <Brightness4 />
      </IconButton>
      <Switch checked={darkMode} onChange={toggleDarkMode} />
    </Box>
  );

  return <Switch checked={darkMode} onChange={toggleDarkMode} />;

  return (
    <>
      <IconButton>
        <WbSunny fontSize="small" />
      </IconButton>
      <Switch checked={darkMode} onChange={toggleDarkMode} />

      <IconButton>
        <NightsStay fontSize="small" />
      </IconButton>
    </>
  );
};

export default ThemeSwitch;
