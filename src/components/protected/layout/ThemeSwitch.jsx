import { Switch } from '@material-ui/core';
import React, { useContext } from 'react';
import { appContext } from '../../../contexts/3.app/appContext';

const ThemeSwitch = () => {
  const { darkMode, toggleDarkMode } = useContext(appContext);
  return <Switch checked={darkMode} onChange={toggleDarkMode} />;
};

export default ThemeSwitch;
