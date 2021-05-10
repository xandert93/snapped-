import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        height: 'auto',
        width: 'auto',
      },
    },
  },
  typography: { htmlFontSize: 10 },
});
