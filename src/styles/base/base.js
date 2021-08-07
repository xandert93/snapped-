import { Card } from '@material-ui/core';

const isVPxs = '@media (max-width: 576px)';
const isVPnotXs = '@media (min-width: 576px)';
const isVPmaxSm = '@media (max-width: 768px)';

export const base = {
  overrides: {
    MuiCssBaseline: {
      '@global': {
        [isVPmaxSm]: {
          body: {
            userSelect: 'none',
          },
        },
      },
    },

    MuiToolbar: {
      root: {
        [isVPxs]: {
          padding: '0 8px', //0 16px* (too big)
        },
      },
    },

    MuiContainer: {
      root: {
        [isVPxs]: {
          padding: 0, //0 16px*
        },
      },
    },

    MuiLink: {
      underlineHover: {
        '&:hover': { textDecoration: 'none' },
      },
    },

    MuiButton: {
      root: {
        borderRadius: 50,
        padding: '8px 20px', //6px 16px*
      },

      // contained: {
      //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      //   borderRadius: 3,
      //   border: 0,
      //   color: 'white',
      //   height: 48,
      //   padding: '0 30px',
      //   boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      // },

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

    MuiFab: {
      root: {
        //default is 56px by 56px, which is too small for me
        height: 72,
        width: 72,
      },
    },

    //<TextField label=""/> size (basically, the placeholder)
    MuiFormLabel: {
      root: {
        [isVPxs]: {
          fontSize: 16, //*1.17rem (slightly too big)
        },
      },
    },

    MuiInputBase: {
      root: {
        [isVPxs]: {
          fontSize: 16, //*1.17rem (slightly too big)
        },
      },
    },

    //<TextField select />'s popover paper
    MuiMenuItem: {
      root: {
        [isVPxs]: {
          fontSize: 16, //*1.17rem (slightly too big)
        },
      },
    },

    //<RadioGroup>'s labels
    MuiFormControlLabel: {
      label: {
        [isVPxs]: {
          fontSize: 16, //*1.17rem (slightly too big)
        },
      },
    },

    MuiAvatar: {
      root: {
        [isVPnotXs]: {
          height: 56,
          width: 56,
        },
      },
    },

    MuiCard: {
      root: {
        borderRadius: 20,
      },
    },

    MuiCardHeader: {
      root: {
        padding: '8px 10px', //16px*
        [isVPnotXs]: {
          padding: '12px 13px 11px',
        },
      },

      avatar: {
        marginRight: '14px',
      },

      title: {
        fontWeight: 600,
        letterSpacing: 2,
        [isVPxs]: {
          lineHeight: 1.4, //1.5*
        },
      },

      subheader: {
        [isVPxs]: {
          lineHeight: 1.4, //1.6*
        },
      },

      action: {
        alignSelf: 'initial', //flex-start* (ugly)
        marginTop: 'initial', //-8px* (ugly)
        marginRight: 'initial', //-8px* (ugly)
      },
    },

    MuiCardContent: {
      root: {
        padding: '10px 14px', //16px*
        [isVPxs]: {
          padding: '8px 12px',
        },
        '&:last-child': {
          paddingTop: 0,
          paddingBottom: '10px', //24px* (massive)
        },
      },
    },

    MuiBottomNavigation: {
      root: {
        [isVPnotXs]: {
          height: 64, //otherwise always 56px*
        },
      },
    },

    MuiListItemIcon: {
      root: {
        [isVPmaxSm]: {
          minWidth: 48, //56* (too big)
        },
      },
    },

    MuiStepper: {
      root: {
        padding: '0 24px',
        [isVPxs]: {
          padding: 0,
        },
        marginRight: 24,
      },
    },

    MuiStepConnector: {
      lineVertical: {
        [isVPxs]: {
          minHeight: 0,
        },
      },
    },
    MuiTab: {
      root: {
        minWidth: 56, //72* (too big)
      },
    },

    MuiDialogTitle: {
      root: {
        [isVPxs]: {
          padding: '12px 16px', //16px 24px* (too big)
        },
      },
    },

    MuiDialogContent: {
      root: {
        [isVPxs]: {
          padding: '12px 16px', //8px 24px* (too wide)
        },
      },
    },

    MuiBottomNavigationAction: {
      root: {
        maxWidth: 'initial',
        minWidth: 'initial',
        width: '100%',
        height: '100%',
        padding: 0,
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },

  props: {
    MuiTextField: {
      variant: 'outlined',
      fullWidth: true,
      required: true,
      autoComplete: 'off', //particularly on mobile, if a lot of options available, makes UI ugly
    },
    MuiBottomNavigationAction: {
      disableRipple: true,
    },

    MuiAlert: {
      elevation: 8,
      variant: 'filled',
    },

    MuiDialog: {
      PaperComponent: Card, //*Paper
      //will now use our App's <Card/> instead, which provides 20px border-radius
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
    body3: {
      fontSize: '50px',
    },
  },
};
