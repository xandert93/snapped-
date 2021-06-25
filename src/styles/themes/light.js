import { createMuiTheme } from '@material-ui/core';
import { base } from '../base/base';
import { red } from '@material-ui/core/colors';

export const light = createMuiTheme({
  ...base,
  palette: {
    type: 'light',
    secondary: red,
  },
});
