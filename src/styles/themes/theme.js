import { createMuiTheme } from '@material-ui/core';
import { blue, cyan, green, red } from '@material-ui/core/colors';

const baseProperties = {
  overrides: {
    MuiToolbar: {
      gutters: {
        paddingLeft: 0,
        paddingRight: 0,
        '@media (min-width: 600px)': {
          paddingLeft: 0,
          paddingRight: 0,
        },
      },
    },

    MuiButton: {
      root: {
        height: 'auto',
        width: 'auto',
      },

      //by default, button label is always "uppercase"
      label: {
        textTransform: 'lowercase',
      },

      iconSizeMedium: {
        '& > *:first-child': {
          fontSize: 30,
        },
      },
    },

    MuiIconButton: {
      root: {
        padding: 0,
      },
    },

    MuiCardHeader: {
      root: {
        padding: '10px 14px',
      },

      avatar: {
        marginRight: '14px',
      },
    },

    MuiCardContent: {
      root: {
        padding: '10px 14px',
        '&:last-child': {
          paddingBottom: '10px',
        },
      },
    },

    MuiStepper: {
      root: {
        padding: '0 24px',
        '@media (max-width: 600px)': {
          padding: 0,
        },
        marginRight: 24,
      },
    },

    MuiStepConnector: {
      lineVertical: {
        '@media (max-width: 600px)': {
          minHeight: 0,
        },
      },
    },
  },

  props: {
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
      // size: 'small',
    },
  },

  typography: {
    fontFamily: `"Questrial", "Helvetica", "Arial", "sans-serif"`,
    fontSize: 16,
    h4: {
      fontWeight: 700,
      letterSpacing: 3,
    },
    button: {
      fontSize: '1.3rem',
      fontWeight: 600,
    },
  },
};

export const themeLight = createMuiTheme({
  ...baseProperties,
  palette: {
    type: 'light',
    secondary: red,
  },
});

export const themeDark = createMuiTheme({
  ...baseProperties,
  palette: {
    type: 'dark',
    primary: {
      // main: cyan['A200'],
      main: blue['400'],
    },
    // secondary: red,
    secondary: { main: blue['900'] },
    background: { default: '#262729', paper: '#000' },
    //any paper-based components e.g. AppBar <header>, Cards will use the paper backgrounds
  },
});
