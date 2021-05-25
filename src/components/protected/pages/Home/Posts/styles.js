import { makeStyles } from '@material-ui/core';

export default makeStyles(
  (theme) => ({
    postsContainer: {
      //without these two properties, MUI causes horizontal scroll: https://stackoverflow.com/questions/45519275/grid-in-material-ui-causes-horizontal-scroll-react
      margin: '0 auto',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        // '& > :not(:last-child)': {
        '& > *': {
          marginBottom: theme.spacing(2),
        },
      },
      [theme.breakpoints.up('sm')]: {
        padding: '.5rem',
      },
      [theme.breakpoints.up('md')]: {
        padding: '1rem',
      },
      [theme.breakpoints.up('lg')]: {
        padding: '1.5rem',
      },
    },

    cardHeader: {
      transition: 'background-color 0.2s, color 0.2s',
      '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
      },
    },

    cardTitle: {
      fontWeight: 600,
    },

    cardMedia: {
      height: 0,
      paddingBottom: '120%', //1.2x card width

      //known as the padding bottom hack. Use 56.25% for 16:9, or 100% for 1:1 (square)
      //for 1:1 shaun also used padding-top: 50%, padding-bottom: 50%

      [theme.breakpoints.up('sm')]: {
        cursor: 'pointer',
        opacity: 0.95,
        '&:hover': {
          opacity: 1,
        },
      },
    },

    cardContentPrimary: {
      display: 'flex',
    },

    clockIcon: {
      verticalAlign: -theme.spacing(1),
      marginRight: '12px',
    },

    clockText: {
      fontStyle: 'italic',
      flexGrow: 1,
    },

    expandMoreCollapsed: {
      padding: 0,
      marginLeft: 'auto', //pushes ExpandMore to far right
      transitionProperty: 'transform',
      transitionDuration: theme.transitions.duration.shortest,
      //transition: transitions.create("transform", {duration: transitions.duration.shortest})
    },
    expanded: {
      transform: 'rotate(180deg)', //rotate ExpandMore 180deg
    },

    modal: {
      position: 'fixed',
      top: 60,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
    },
    modalBody: {
      margin: 'auto',
      background: 'white',
      textAlign: 'center',
      background: 'transparent',
      //factor in toolbar when i can
    },

    modalImg: {
      //height: auto*; width: auto*
      maxHeight: '80vh',
      maxWidth: '80vw',
      //width and height auto up until this point
      borderRadius: 10,
      border: '4px solid white',
    },
  }),
  { index: 1 }
);
