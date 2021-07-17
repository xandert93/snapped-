import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  gridContainer: {
    margin: 0, //-4 * grid spacing #weird
    // [theme.breakpoints.down('xs')]: {
    //   '& >:not(:last-child)': {
    //     marginBottom: theme.spacing(2),
    //   },
    // },
  },

  masonryContainer: {
    display: 'flex',
    marginLeft: -20 /* gutter size offset */,
    width: 'auto',
  },

  masonryColumn: {
    paddingLeft: 20 /* gutter size */,
    backgroundClip: 'padding-box',

    '& > div': {
      margin: theme.spacing(1),

      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(0, 0, 3, 0),
      },
    },
  },
  //experimental for skeletons
  card: {
    minWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 350,
    minWidth: 360,
  },
}));
