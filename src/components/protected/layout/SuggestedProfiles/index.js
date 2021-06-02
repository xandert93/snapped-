import { Grid } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import authContext from '../../../../contexts/auth/authContext';
import { getSuggestedUserDocs } from '../../../../services/firebase';
import SuggestedProfile from './SuggestedProfile';

export default () => {
  const {
    currentUserDoc: { username, following },
  } = useContext(authContext);
  const [altUsersDocs, setAltUsersDocs] = useState([]);

  useEffect(() => {
    //used .then because using async/await would require creation of another function here
    getSuggestedUserDocs(username, following).then(setAltUsersDocs);
  }, []);

  return (
    <Grid item sm={3} lg={2}>
      {altUsersDocs.length
        ? altUsersDocs.map((altUserDoc) => (
            <SuggestedProfile key={altUserDoc.id} altUserDoc={altUserDoc} />
          ))
        : null}
    </Grid>
  );
};

//individual suggested profile must have its own component since each one will
//require its own "isFollowed" state which we will toggle with + and - sign
