import { createMuiTheme } from '@material-ui/core';
import {
  amber,
  blue,
  cyan,
  green,
  red,
  yellow,
} from '@material-ui/core/colors';
import { base } from '../base/base';

export const dark = createMuiTheme({
  ...base,
  palette: {
    type: 'dark',
    primary: {
      // main: cyan['A200'],
      main: blue['400'],
    },
    secondary: red,
    // secondary: { main: blue['900'] },
    // secondary: { main: amber['A700'] },

    background: { default: '#03092b', paper: '#000' },
    //any paper-based components e.g. AppBar <header>, Cards will use the paper backgrounds
    // text: {
    //   primary: amber['A200'],
    // },
    text: {
      secondary: '#fff',
    },
  },
});
