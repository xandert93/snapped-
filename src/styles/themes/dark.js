import { createMuiTheme } from '@material-ui/core';
import { blue, cyan, green, red } from '@material-ui/core/colors';
import { base } from '../base/base';

export const dark = createMuiTheme({
  ...base,
  palette: {
    type: 'dark',
    primary: {
      // main: cyan['A200'],
      main: blue['400'],
    },
    // secondary: red,
    secondary: { main: blue['900'] },
    background: { default: '#03092b', paper: '#000' },
    //any paper-based components e.g. AppBar <header>, Cards will use the paper backgrounds
  },
});
