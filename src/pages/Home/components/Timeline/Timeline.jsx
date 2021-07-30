import PostCard from './PostCard';
import useStyles from './styles';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useGridScroll, usePostsCollection } from '../../../../custom-hooks';
import { isCardMedia } from '../../../../utils/helpers';
import Masonry from 'react-masonry-css';

import { useDispatch, useSelector } from 'react-redux';
import {
  deletePost,
  setPostToEdit,
  updatePostLikes,
} from '../../../../state/posts/actions';
import {
  openPostEditDialog,
  setConfirmationDialog,
} from '../../../../state/app/actions';
import { PostCardSkeleton } from './PostCardSkeleton/PostCardSkeleton';

export default function Timeline({ openModal }) {
  const classes = useStyles();
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs'));
  const {
    breakpoints: {
      values: { md, lg, xl },
    },
  } = useTheme();

  usePostsCollection(); //initialises posts + pfpLookup below. However, selects entire post state. When any single post updates e.g. like toggled or comment CRUD, store.posts updates and entire timeline re-renders

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.timeline);
  const lookup = useSelector((state) => state.lookups.profilePics);

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

  const clickHandlers = {
    moreIcon: (id) => {
      dispatch(setPostToEdit(id));
    },
    editIcon: () => {
      dispatch(openPostEditDialog());
    },
    trashIcon: () => {
      dispatch(setConfirmationDialog(postDeletionDialogData));
    },
    // heartIcon: async (id, userUsername, wasLiked) => {
    //   dispatch(updatePostLikes(id, userUsername, wasLiked)); //Firebase + Redux Store
    // },
  };

  return (
    <Masonry
      className={classes.masonryContainer}
      columnClassName={classes.masonryColumn}
      breakpointCols={{ default: 4, [xl]: 3, [lg]: 2, [md]: 1 }}>
      {!posts.length && lookup //0 + null while fetch is happening
        ? Array.from(new Array(initialNoOfPostsShown)).map((_, idx) => (
            <PostCardSkeleton key={idx} />
          ))
        : posts.map(
            (post, idx) =>
              idx < noOfPostsShown && (
                <div key={post.id} className={classes.gridItem}>
                  <PostCard post={post} clickHandlers={clickHandlers} />
                </div>
              )
          )}
    </Masonry>
  );
}
