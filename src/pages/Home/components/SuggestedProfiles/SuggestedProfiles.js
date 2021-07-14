import { Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getSuggestedUserDocs } from '../../../../services/firebase/firestore';
import { userSelector } from '../../../../state/selectors';
import SuggestedProfile from './SuggestedProfile';

export default function SuggestedProfiles() {
  const { username, following } = useSelector(userSelector);

  const [altUsers, setAltUsers] = useState([]);

  useEffect(() => {
    //used .then because using async/await would require creation of another function here
    getSuggestedUserDocs(username, following).then(setAltUsers);
  }, []);

  return (
    <Grid item sm={3} lg={2}>
      {!!altUsers.length &&
        altUsers.map((altUser) => (
          <SuggestedProfile key={altUser.id} altUser={altUser} />
        ))}
    </Grid>
  );
}

//individual suggested profile must have its own component since each one will
//require its own "isFollowed" state which we will toggle with + and - sign
