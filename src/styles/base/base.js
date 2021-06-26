export const base = {
  overrides: {
    MuiContainer: {
      root: {
        '@media (max-width: 600px)': {
          padding: 0, //0 16px*
        },
      },
    },

    MuiButton: {
      root: {
        // height: 'auto',
        // width: 'auto',
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

    MuiAvatar: {
      root: {
        '@media (min-width: 960px)': {
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
        '@media (min-width: 600px)': {
          padding: '12px 13px 11px',
        },
      },

      avatar: {
        marginRight: '14px',
      },

      title: {
        fontWeight: 600,
        letterSpacing: 2,
        '@media (max-width: 600px)': {
          lineHeight: 1.4, //1.5*
        },
      },

      subheader: {
        '@media (max-width: 600px)': {
          lineHeight: 1.4, //1.6*
        },
      },

      action: {
        alignSelf: 'initial', //flex-start* ugly
        marginTop: 'initial', //-8px* ugly
        marginRight: 'initial', //-8px* ugly
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
    body3: {
      fontSize: '50px',
    },
  },
};
