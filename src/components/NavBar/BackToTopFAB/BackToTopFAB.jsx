import { useMediaQuery } from '@material-ui/core';
import { Box, Zoom, Fab } from '@material-ui/core';
import { KeyboardArrowUp } from '@material-ui/icons';
import useStyles from './styles';

export default function BackToTopFAB({ isScrolledDown }) {
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm'));
  const classes = useStyles({ isVPsm });

  const scrollToTop = () =>
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Zoom in={isScrolledDown} timeout={500}>
      <Box onClick={scrollToTop} className={classes.root + ' mui-fixed'}>
        <Fab color="primary">
          <KeyboardArrowUp fontSize="large" className={classes.arrowUpIcon} />
        </Fab>
      </Box>
    </Zoom>
  );
}
