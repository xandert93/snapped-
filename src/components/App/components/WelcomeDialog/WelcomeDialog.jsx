import useStyles from './styles';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  Avatar,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  CircularProgress,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { selectUser } from '../../../../state/auth/selectors';
import { selectIsSubmitting } from '../../../../state/app/selectors';
import { UploadAvatar } from '../../../UploadAvatar';
import { TextField } from '../../../TextField';
import { closeWelcomeDialog } from '../../../../state/app/actions';
import _ from 'lodash';
import { updateUserDetails } from '../../../../state/auth/actions';
import { checkIsVPxs } from '../../../../styles/mqSelectors';

let defaultUserDetails = {
  dob: '',
  pronouns: '',
  bio: '',
  location: '',
  websiteURL: '',
};

const charLimits = {
  name: 50,
  bio: 160,
  location: 30,
  websiteURL: 100,
};

export default function WelcomeDialog() {
  const classes = useStyles();
  const isVPxs = useMediaQuery(checkIsVPxs);

  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.app.isWelcomeDialogOpen);
  const close = () => dispatch(closeWelcomeDialog());

  const { name, profilePicURL } = useSelector(selectUser);
  const existingUserDetails = useSelector((state) => state.auth.user.details);
  const [userDetails, setUserDetails] = useState(existingUserDetails || defaultUserDetails);
  const { dob, pronouns, bio, location, websiteURL } = userDetails;

  const handleInputChange = (e) => setUserDetails((x) => ({ ...x, [e.target.name]: e.target.value }));

  let isDetailsUnchanged = _.isEqual(existingUserDetails, userDetails);
  const isSubmitting = useSelector(selectIsSubmitting);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserDetails(userDetails));
  };

  return (
    <Dialog fullScreen={isVPxs} open={isOpen} onClose={close}>
      <DialogTitle className={classes.title}>Welcome to "snapped!", {name.split(' ')[0]}!</DialogTitle>
      <DialogContent>
        <DialogContentText>We can see that you're new on the block!</DialogContentText>
        <DialogContentText>Feel free to choose your profile picture:</DialogContentText>
        <DialogContentText>
          <Avatar
            component={UploadAvatar} //2 props below provide <img> {children}
            alt={name}
            src={profilePicURL}
          />
        </DialogContentText>
        <DialogContentText>Want to tell folks more about yourself?</DialogContentText>
        <Grid container spacing={2} component="form" id="user_details-form" onSubmit={handleSubmit}>
          {/* <Grid item xs={12}>
            <TextField id="" label="Name" required={false} />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              name="dob"
              label="🎈 Date of Birth"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={dob}
              onChange={handleInputChange}
              required={false}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Something?" required={false} />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.fieldset} component="fieldset">
              <FormLabel component="legend">👬 Pronouns</FormLabel>
              <RadioGroup row name="pronouns" value={pronouns} onChange={handleInputChange}>
                <FormControlLabel value="He/Him" control={<Radio color="primary" />} label="He/Him" />
                <FormControlLabel value="She/Her" control={<Radio />} label="She/Her" />
                <FormControlLabel value="They/Hey/Gay" control={<Radio />} label="They/Hey/Gay" />
                <FormControlLabel value="Puss" control={<Radio />} label="Puss" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="bio"
              label="📜 Bio"
              inputProps={{ maxLength: charLimits.bio }}
              value={bio}
              onChange={handleInputChange}
              helperText={`${bio.length}/${charLimits.bio}`}
              required={false}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="location"
              label="📍 Location"
              inputProps={{ maxLength: charLimits.location }}
              value={location}
              onChange={handleInputChange}
              helperText={`${location.length}/${charLimits.location}`}
              required={false}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="websiteURL"
              type="url"
              label="🖥️ Website"
              inputProps={{ maxLength: charLimits.websiteURL }}
              value={websiteURL}
              onChange={handleInputChange}
              helperText={`${websiteURL.length}/${charLimits.websiteURL}`}
              required={false}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        {isSubmitting && <CircularProgress thickness={6} size={30} />}
        <Button disabled={isSubmitting} onClick={close} color="primary">
          Cancel
        </Button>
        <Button type="submit" form="user_details-form" disabled={isDetailsUnchanged || isSubmitting} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

//DialogTitle outputs a <div><h2>{title}<h2></div>
//DialogContent outputs a scrollable <div>
//DialogActions are separate from <DC>...never scrolled.
