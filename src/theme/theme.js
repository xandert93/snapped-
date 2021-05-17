import { createMuiTheme } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
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

      iconSizeMedium: {
        '& > *:first-child': {
          fontSize: 30,
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

  palette: {
    secondary: red,
  },
});
