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
import { useGridScroll, usePostsCollection } from '../../../../custom-hooks';
import Masonry from 'react-masonry-css';

import { useDispatch, useSelector } from 'react-redux';
import { deletePost, setPostToEdit } from '../../../../state/posts/actions';
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

  usePostsCollection(); //initialises posts + pfpLookup below

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

  const clickHandlers = {
    moreIcon: (id) => {
      dispatch(setPostToEdit(id));
    },
    editIconClickHandler: () => {
      dispatch(openPostEditDialog());
    },
    trashIconClickHandler: () => {
      dispatch(setConfirmationDialog(postDeletionDialogData));
    },
  };

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
        {!posts.length && lookup //0 + null while fetch is happening
          ? Array.from(new Array(initialNoOfPostsShown)).map((_, idx) => (
              <PostCardSkeleton key={idx} />
            ))
          : posts.map((post, idx) => {
              if (idx < noOfPostsShown) {
                let profilePicURL = lookup[post.username].profilePicURL;
                return (
                  <div key={post.id} className={classes.gridItem}>
                    <PostCard
                      post={post}
                      profilePicURL={profilePicURL}
                      clickHandlers={clickHandlers}
                      isVPxs={isVPxs}
                    />
                  </div>
                );
              }
            })}
      </Masonry>
    </>
  );
}
