import { Box, Zoom, Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import useStyles from './styles';

export default function BackToTopButton({ isScrolledDown }) {
  const classes = useStyles();

  const scrollToTop = () =>
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Zoom in={isScrolledDown} timeout={500}>
      <Box onClick={scrollToTop} className={classes.root}>
        <Fab color="primary">
          <KeyboardArrowUp fontSize="large" className={classes.arrowUpIcon} />
        </Fab>
      </Box>
    </Zoom>
  );
}
