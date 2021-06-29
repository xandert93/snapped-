import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
  gridContainer: {
    margin: 0, //-4 * grid spacing #weird
    [theme.breakpoints.down('xs')]: {
      '& >:not(:last-child)': {
        marginBottom: theme.spacing(2),
      },
    },
  },
}));

// postsContainer: {
//   //without these two properties, MUI causes horizontal scroll: https://stackoverflow.com/questions/45519275/grid-in-material-ui-causes-horizontal-scroll-react
//   margin: '0 auto',
//   width: '100%',
//   [theme.breakpoints.down('sm')]: {
//     // '& > :not(:last-child)': {
//     '& > *': {
//       marginBottom: theme.spacing(2),
//     },
//   },
//   [theme.breakpoints.up('sm')]: {
//     padding: '.5rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     padding: '1rem',
//   },
//   [theme.breakpoints.up('lg')]: {
//     padding: '1.5rem',
//   },
// },
