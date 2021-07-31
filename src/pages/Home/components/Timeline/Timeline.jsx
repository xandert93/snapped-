import useStyles from './styles';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useGridScroll, usePostsCollection } from '../../../../custom-hooks';
import Masonry from 'react-masonry-css';

import { useSelector } from 'react-redux';

import { PostCard, PostCardSkeleton } from '../../../../components';

export default function Timeline({ openModal }) {
  const classes = useStyles();
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs'));
  const {
    breakpoints: {
      values: { md, lg, xl },
    },
  } = useTheme();

  usePostsCollection(); //initialises posts + pfpLookup below. However, selects entire post state. When any single post updates e.g. like toggled or comment CRUD, store.posts updates and entire timeline re-renders

  const posts = useSelector((state) => state.posts.timeline);
  const lookup = useSelector((state) => state.lookups.profilePics);

  const initialNoOfPostsShown = isVPxs ? 4 : 8;

  const noOfPostsShown = useGridScroll(initialNoOfPostsShown, posts.length, 2000);

  return (
    <Masonry
      className={classes.masonryContainer}
      columnClassName={classes.masonryColumn}
      breakpointCols={{ default: 4, [xl]: 3, [lg]: 2, [md]: 1 }}>
      {!posts.length && lookup //0 + null while fetch is happening
        ? Array.from(new Array(initialNoOfPostsShown)).map((_, idx) => <PostCardSkeleton key={idx} />)
        : posts.map(
            (post, idx) =>
              idx < noOfPostsShown && (
                <div key={post.id} className={classes.gridItem}>
                  <PostCard post={post} />
                </div>
              )
          )}
    </Masonry>
  );
}
