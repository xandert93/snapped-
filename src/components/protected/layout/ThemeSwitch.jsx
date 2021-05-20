import { Switch } from '@material-ui/core';
import React from 'react';

const ThemeSwitch = ({ darkMode, setDarkMode }) => {
  return <Switch checked={darkMode} onChange={() => setDarkMode((x) => !x)} />;
};

export default ThemeSwitch;
