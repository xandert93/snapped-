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
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';
import { userSelector } from '../../../../state/auth/selectors';
import { isSubmittingSelector } from '../../../../state/app/selectors';
import { UploadAvatar } from '../../../UploadAvatar';
import { TextField } from '../../../TextField';
import { closeWelcomeDialog, setIsSubmitting, setSuccessSnackbar } from '../../../../state/app/actions';
import { fbUpdateUserDetails } from '../../../../services/firebase/firestore/users';
import _ from 'lodash';
import { updateUserDetails } from '../../../../state/auth/actions';

let defaultUserDetails = {
  name: '',
  dob: '2000-01-01',
  pronouns: 'Gay',
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
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.only('xs'));

  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.app.isWelcomeDialogOpen);
  const close = () => dispatch(closeWelcomeDialog());

  const { username, name, followers, profilePicURL } = useSelector(userSelector);
  const existingUserDetails = useSelector((state) => state.auth.user.details);
  const [userDetails, setUserDetails] = useState(existingUserDetails || defaultUserDetails);
  const { dob, pronouns, bio, location, websiteURL } = userDetails;

  const isUserNew = useSelector((state) => {
    // let { profilePicURL, bio, followers } = state.auth.user;
    // return !profilePicURL && !bio && followers.length < 3;
    return true;
  });

  console.log(dob);

  const handleInputChange = (e) => setUserDetails((x) => ({ ...x, [e.target.name]: e.target.value }));

  let isDetailsUnchanged = _.isEqual(existingUserDetails, userDetails);
  const isSubmitting = useSelector(isSubmittingSelector);
  const handleSubmit = async () => dispatch(updateUserDetails(userDetails));

  return (
    <Dialog fullScreen={isVPxs} open={isOpen} onClose={close}>
      <DialogTitle>Welcome to "snapped!", {name.split(' ')[0]}!</DialogTitle>
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
        <Grid container spacing={2}>
          {/* <Grid item xs={12}>
            <TextField id="" label="Name" required={false} />
          </Grid> */}

          <Grid item xs={12} sm={6}>
            <TextField
              name="dob"
              label="Date of Birth"
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
            <FormControl component="fieldset">
              <FormLabel component="legend">Pronouns</FormLabel>
              <RadioGroup row name="pronouns" value={pronouns} onChange={handleInputChange}>
                <FormControlLabel value="He/Him" control={<Radio color="primary" />} label="He/Him" />
                <FormControlLabel value="She/Her" control={<Radio />} label="She/Her" />
                <FormControlLabel value="They/Hey/Gay" control={<Radio />} label="They/Hey/Gay" />
                <FormControlLabel value="Penguin" control={<Radio />} label="Penguin" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="bio"
              label="Bio"
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
              label="Location"
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
              label="Website"
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
        <Button disabled={isSubmitting} onClick={close} color="primary">
          Cancel
        </Button>
        <Button disabled={isDetailsUnchanged || isSubmitting} onClick={handleSubmit} color="secondary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
