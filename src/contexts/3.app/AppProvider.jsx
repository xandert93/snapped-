import React, { useCallback, useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from '../../styles/themes';
import { appContext } from './appContext';

const initialSnackbar = {
  isOpen: false,
  isSuccess: true,
  message: '',
};

const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState(initialSnackbar);

  const resetSnackbar = () => setSnackbar((x) => ({ ...x, isOpen: false }));

  const toggleDarkMode = useCallback(
    () => setDarkMode((x) => !x),
    [setDarkMode]
  );

  return (
    <appContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        isSubmitting,
        setIsSubmitting,
        snackbar,
        setSnackbar,
        resetSnackbar,
      }}>
      <ThemeProvider theme={!darkMode ? light : dark}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </appContext.Provider>
  );
};

export default AppProvider;
