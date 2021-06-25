import React, { useCallback, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from '../../styles/themes';
import { appContext } from './appContext';
import { useGetDeviceWidth } from '../../custom-hooks';

const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);
  const innerWidth = useGetDeviceWidth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msgData, setMsgData] = useState(null);

  const toggleDarkMode = useCallback(
    () => setDarkMode((x) => !x),
    [setDarkMode]
  );

  return (
    <appContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        innerWidth,
        isSubmitting,
        setIsSubmitting,
        msgData,
        setMsgData,
      }}>
      <ThemeProvider theme={!darkMode ? light : dark}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </appContext.Provider>
  );
};

export default AppProvider;
