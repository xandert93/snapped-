import { useSetDocumentTitle } from '../../custom-hooks';
import { Timeline } from './components';
import { Grid } from '@material-ui/core';

import useStyles from './styles';

export default function Home() {
  const classes = useStyles();
  useSetDocumentTitle('Home');

  return (
    <Grid container>
      <Timeline />
    </Grid>
  );

  // const openModal = (e) => {
  //   if (isCardMedia(e.target)) {
  //     setPostToEdit(homePosts[e.target.dataset.postsIdx]);
  //     setShowModal(true);
  //   }
  // };

  // const closeDialog = (e) =>
  //   !e.target.className.includes('modalImg') && setShowModal(false);

  return (
    <Grid container>
      {/* <SuggestedProfiles /> */}
      {/* changes user doc when altuser followed. usepostscoll fires again, returns new docs */}

      <Timeline

      // openModal={openModal}
      />

      {/* {showModal && (
          <ImageModal url={postToEdit.url} closeDialog={closeDialog} />
        )} */}
    </Grid>
  );
}
