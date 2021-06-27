import { Switch, IconButton } from '@material-ui/core';
import { NightsStay, WbSunny } from '@material-ui/icons';
import React, { useContext } from 'react';
import { appContext } from '../../contexts/3.app/appContext';
import useStyles from './styles';

const ThemeSwitch = () => {
  const classes = useStyles();
  const { darkMode, toggleDarkMode } = useContext(appContext);

  return (
    <IconButton onClick={toggleDarkMode}>
      {darkMode ? (
        <WbSunny className={classes.sunIcon} fontSize="large" />
      ) : (
        <NightsStay className={classes.moonIcon} fontSize="large" />
      )}
    </IconButton>
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
