import { forwardRef } from 'react';

import { useSelector } from 'react-redux';
import { selectIsSubmitting } from '../../state/app/selectors';

import { AppBar, Container, Dialog, Slide, Fade, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import { DismissButton } from './DismissButton';
import { SubmitButton } from './SubmitButton';

import useStyles from './styles';
import { checkIsVPxs } from '../../styles/mqSelectors';

const CustomSlide = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

export default function PostDialog({ isOpen, close, title, SubmitIcon, children }) {
  const classes = useStyles();
  const isVPxs = useMediaQuery(checkIsVPxs);

  const isSubmitting = useSelector(selectIsSubmitting);

  return (
    <Dialog
      open={isOpen}
      onClose={isSubmitting ? null : close}
      fullWidth={true}
      fullScreen={isVPxs}
      TransitionComponent={isVPxs ? CustomSlide : Fade}>
      <AppBar className={classes.appBar} position="sticky" component="div">
        <Toolbar className={classes.toolbar}>
          <DismissButton clickHandler={close} />
          <Typography color="textPrimary" variant={isVPxs ? 'h6' : 'h5'}>
            {title}
          </Typography>
          <SubmitButton SubmitIcon={SubmitIcon} />
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">{children}</Container>
    </Dialog>
  );
}
