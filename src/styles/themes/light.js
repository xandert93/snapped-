import { createTheme } from '@material-ui/core';
import { base } from '../base/base';
import { red } from '@material-ui/core/colors';

export const light = createTheme({
  ...base,
  palette: {
    type: 'light',
    secondary: red,

    // background: { default: '#f5ebda' },

    action: {
      active: 'rgba(0,0,0,0.85)',
    },
  },
});
