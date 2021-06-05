import React, { useCallback, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { themeDark, themeLight } from '../../styles/themes/theme';
import { appContext } from './appContext';
import { useGetDeviceWidth } from '../../custom-hooks';

const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const innerWidth = useGetDeviceWidth();

  const toggleDarkMode = useCallback(
    () => setDarkMode((x) => !x),
    [setDarkMode]
  );

  return (
    <appContext.Provider value={{ darkMode, toggleDarkMode, innerWidth }}>
      <ThemeProvider theme={!darkMode ? themeLight : themeDark}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </appContext.Provider>
  );
};

export default AppProvider;
