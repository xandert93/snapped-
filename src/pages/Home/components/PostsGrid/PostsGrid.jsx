import PostCard from './PostCard';
import useStyles from './styles';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { useGridScroll } from '../../../../custom-hooks';
import { useState } from 'react';
import { isCardMedia } from '../../../../utils/helpers';
import Masonry from 'react-masonry-css';
import { ConfirmationDialog, SlidingModal } from '../../../../components';
import { UpdatePostForm } from '../../../Profile/components';
import { deletePost } from '../../../../services/firebase';
import { Skeleton } from '@material-ui/lab';

const PostsGrid = ({ posts, openModal }) => {
  const classes = useStyles();
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs'));
  const {
    breakpoints: {
      values: { md, lg, xl },
    },
  } = useTheme();

  const initialNoOfPostsShown = isVPxs ? 4 : 8;

  const noOfPostsShown = useGridScroll(
    initialNoOfPostsShown,
    posts.length,
    2000
  );

  // const [showModal, setShowModal] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const [hoveredCardIdx, setHoveredCardIdx] = useState(-1);
  // const mouseOverHandler = (e) =>
  //   isCardMedia(e.target) && setHoveredCardIdx(+e.target.dataset.postsIdx);

  const clickHandler = ({ target: { dataset } }) => {
    if (dataset.role) {
      setPostToEdit(posts[dataset.postsIdx]);
      if (dataset.role === 'Delete Post') {
        setIsDialogOpen(true);
      }
    }
  };

  const deleteHandler = async () =>
    await deletePost(postToEdit.id, postToEdit.fileName);

  return (
    <>
      <Masonry
        className={classes.masonryContainer}
        columnClassName={classes.masonryColumn}
        breakpointCols={{ default: 4, [xl]: 3, [lg]: 2, [md]: 1 }}
        // onMouseOver={isVPxs ? null : mouseOverHandler}
        // onMouseOut={() => setHoveredCardIdx(-1)}
        // onClick={isVPxs ? null : openModal}
        onClick={clickHandler}>
        {!posts.length //0 while fetch is happening
          ? Array.from(new Array(initialNoOfPostsShown)).map((_) => (
              <Box>
                <Skeleton
                  animation="pulse"
                  variant="rect"
                  width={350}
                  height={550}
                />
                <Skeleton animation="pulse" />
                <Skeleton animation="pulse" width="60%" />
              </Box>
            ))
          : posts.map(
              (post, idx) =>
                idx < noOfPostsShown && (
                  <div key={post.id} className={classes.gridItem}>
                    <PostCard
                      {...{
                        post,
                        idx,
                        isVPxs,
                        // isCardMediaHovered: hoveredCardIdx === idx ? true : false,
                      }}
                    />
                  </div>
                )
            )}
      </Masonry>

      {/* repeated, refactor into single component*/}
      <SlidingModal
        isOpen={!isDialogOpen && !!postToEdit}
        close={() => setPostToEdit(null)}
        title="Edit Your Post!">
        <UpdatePostForm
          imageURL={postToEdit?.url}
          post={postToEdit}
          closeModal={() => setPostToEdit(null)}
        />
      </SlidingModal>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        close={() => {
          setIsDialogOpen(false);
          setPostToEdit(null);
        }}
        title="delete this post?"
        content="Your post will be permanenty deleted and cannot be recovered."
        choices={['cancel', 'confirm']}
        clickHandler={deleteHandler}
      />
    </>
  );
};

export default PostsGrid;
