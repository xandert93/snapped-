import { forwardRef } from 'react';
import useStyles from './styles';
import {
  AppBar,
  Container,
  Dialog,
  IconButton,
  Slide,
  Fade,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { useContext } from 'react';
import { appContext } from '../../contexts/3.app/appContext';

const CustomSlide = forwardRef((props, ref) => (
  <Slide direction="left" ref={ref} {...props} />
));

const SlidingModal = ({ isOpen, close, title, children }) => {
  const classes = useStyles();
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.only('xs'));
  const { isSubmitting } = useContext(appContext);

  return (
    <Dialog
      open={isOpen}
      onClose={isSubmitting ? null : close}
      fullScreen={isVPxs}
      TransitionComponent={isVPxs ? CustomSlide : Fade}>
      <AppBar className={classes.appBar} position="sticky" component="div">
        <Toolbar>
          <IconButton
            className={classes.backButton}
            color="inherit"
            disabled={isSubmitting}
            onClick={close}>
            <ArrowBack />
          </IconButton>
          <Typography color="inherit" variant="h5">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">{children}</Container>
    </Dialog>
  );
};

export default SlidingModal;
