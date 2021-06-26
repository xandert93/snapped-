import { Box, Zoom, Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import useStyles from './styles';

export default function BackToTopButton({ anchor, isScrolledDown }) {
  const classes = useStyles();

  const scrollToTop = () =>
    anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Zoom in={isScrolledDown} timeout={500}>
      <Box onClick={scrollToTop} className={classes.root}>
        <Fab color="primary">
          <KeyboardArrowUp className={classes.arrowUpIcon} />
        </Fab>
      </Box>
    </Zoom>
  );
}
