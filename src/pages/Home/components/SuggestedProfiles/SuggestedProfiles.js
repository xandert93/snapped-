import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fbGetSuggestedAltUsers } from '../../../../services/firebase/firestore/users';
import { userFollowingSelector, selectUserUsername } from '../../../../state/auth/selectors';
import SuggestedProfile from './SuggestedProfile';

export default function SuggestedProfiles() {
  const userUsername = useSelector(selectUserUsername);
  const userFollowing = useSelector(userFollowingSelector);

  const [altUsers, setAltUsers] = useState([]);

  useEffect(() => {
    fbGetSuggestedAltUsers(userUsername, userFollowing).then(setAltUsers);
  }, []);

  return (
    <Grid item sm={3} lg={2}>
      {!!altUsers.length && altUsers.map((altUser) => <SuggestedProfile key={altUser.id} altUser={altUser} />)}
    </Grid>
  );
}

//individual suggested profile must have its own component since each one will
//require its own "isFollowed" state which we will toggle with + and - sign
