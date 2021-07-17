import PostCard from './PostCard';
import useStyles from './styles';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import {
  useGridScroll,
  usePostsCollection,
  useUsersCollection,
} from '../../../../custom-hooks';
import { useEffect, useState } from 'react';
import { isCardMedia } from '../../../../utils/helpers';
import Masonry from 'react-masonry-css';
import { ConfirmationDialog, PostDialog } from '../../../../components';
import { PostEditForm } from '../../../Profile/components';
import { fbDeletePost } from '../../../../services/firebase/firestore';
import { Skeleton } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, setPostToEdit } from '../../../../state/posts/actions';
import {
  openPostEditDialog,
  setConfirmationDialog,
} from '../../../../state/app/actions';
import { userSelector } from '../../../../state/selectors';

const Timeline = ({ openModal }) => {
  const classes = useStyles();
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs'));
  const {
    breakpoints: {
      values: { md, lg, xl },
    },
  } = useTheme();

  usePostsCollection();

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.timeline);

  const profilePicturesLookup = useUsersCollection();

  const initialNoOfPostsShown = isVPxs ? 4 : 8;

  const noOfPostsShown = useGridScroll(
    initialNoOfPostsShown,
    posts.length,
    2000
  );

  const postDeletionDialogData = {
    isOpen: true,
    title: 'delete this post?',
    content: 'Your post will be permanenty deleted and cannot be recovered.',
    choices: ['cancel', 'confirm'],
    confirmHandler: () => dispatch(deletePost()),
  };

  /*   const linkClickHandler = () =>
    sessionStorage.setItem('scrollPosition', window.pageYOffset); */

  //sorta got this working, but as with other stackoverflow posts,
  //when user goes back, pageYOffset starts at 0 then scrolls down to new position
  //looks shit.

  /*   useEffect(() => {
    const prevScrollPosition = sessionStorage.getItem('scrollPosition');
    if (prevScrollPosition) {
      window.scrollTo(0, +prevScrollPosition);
      // sessionStorage.removeItem("scrollPosition");
    }
  }); */

  // const [showModal, setShowModal] = useState(false);

  // const [hoveredCardIdx, setHoveredCardIdx] = useState(-1);
  // const mouseOverHandler = (e) =>
  //   isCardMedia(e.target) && setHoveredCardIdx(+e.target.dataset.postsIdx);

  const moreIconClickHandler = (id) => dispatch(setPostToEdit(id));

  const editIconClickHandler = () => dispatch(openPostEditDialog());

  const trashIconClickHandler = () =>
    dispatch(setConfirmationDialog(postDeletionDialogData));

  return (
    <>
      <Masonry
        className={classes.masonryContainer}
        columnClassName={classes.masonryColumn}
        breakpointCols={{ default: 4, [xl]: 3, [lg]: 2, [md]: 1 }}
        // onMouseOver={isVPxs ? null : mouseOverHandler}
        // onMouseOut={() => setHoveredCardIdx(-1)}
        // onClick={isVPxs ? null : openModal}
        // onClick={moreIconClickHandler}
      >
        {!posts.length //0 while fetch is happening
          ? Array.from(new Array(initialNoOfPostsShown)).map((_, idx) => (
              <Card key={idx}>
                <CardHeader
                  avatar={
                    <Skeleton
                      animation="wave"
                      variant="circle"
                      width={56}
                      height={56}
                    />
                  }
                  title={
                    <Skeleton
                      animation="wave"
                      height={10}
                      width="80%"
                      style={{ marginBottom: 6 }}
                    />
                  }
                  subheader={
                    <Skeleton animation="wave" height={10} width="40%" />
                  }
                />
                <Skeleton
                  animation="wave"
                  variant="rect"
                  className={classes.media}
                />
                <CardContent>
                  <Skeleton
                    animation="wave"
                    height={10}
                    style={{ marginBottom: 6 }}
                  />
                  <Skeleton animation="wave" height={10} width="80%" />
                </CardContent>
              </Card>
            ))
          : posts.map(
              (post, idx) =>
                idx < noOfPostsShown && (
                  <div key={post.id} className={classes.gridItem}>
                    <PostCard
                      {...{
                        post,
                        idx,
                        pfpURL:
                          profilePicturesLookup?.[post.username].profilePicURL,
                        isVPxs,
                        moreIconClickHandler,
                        editIconClickHandler,
                        trashIconClickHandler,
                        // linkClickHandler,
                        // isCardMediaHovered: hoveredCardIdx === idx ? true : false,
                      }}
                    />
                  </div>
                )
            )}
      </Masonry>

      {/* <ConfirmationDialog
        isOpen={isDialogOpen}
        close={() => {
          setIsDialogOpen(false);
          setPostToEdit(null);
        }}
        title="delete this post?"
        content="Your post will be permanenty deleted and cannot be recovered."
        choices={['cancel', 'confirm']}
        confirmHandler={deleteHandler}
      /> */}
    </>
  );
};

export default Timeline;
