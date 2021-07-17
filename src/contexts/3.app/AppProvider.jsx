import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { light, dark } from '../../styles/themes';
import { appContext } from './appContext';
import { useSelector } from 'react-redux';

const AppProvider = ({ children }) => {
  const isDarkMode = useSelector((state) => state.app.isDarkMode);

  return (
    <appContext.Provider value="">
      <ThemeProvider theme={isDarkMode ? dark : light}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </appContext.Provider>
  );
};

export default AppProvider;
