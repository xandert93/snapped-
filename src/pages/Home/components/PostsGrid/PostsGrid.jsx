import PostCard from './PostCard';
import useStyles from './styles';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useGridScroll } from '../../../../custom-hooks';
import { useState } from 'react';
import { isCardMedia } from '../../../../utils/helpers';
import Masonry from 'react-masonry-css';

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

  const [hoveredCardIdx, setHoveredCardIdx] = useState(-1);
  const mouseOverHandler = (e) =>
    isCardMedia(e.target) && setHoveredCardIdx(+e.target.dataset.postsIdx);

  return (
    <Masonry
      className={classes.masonryContainer}
      columnClassName={classes.masonryColumn}
      breakpointCols={{ default: 4, [xl]: 3, [lg]: 2, [md]: 1 }}
      onMouseOver={isVPxs ? null : mouseOverHandler}
      onMouseOut={() => setHoveredCardIdx(-1)}
      onClick={isVPxs ? null : openModal}>
      {posts.map(
        (post, idx) =>
          idx < noOfPostsShown && (
            <div key={post.id} className={classes.gridItem}>
              <PostCard
                {...{
                  post,
                  idx,
                  isVPxs,
                  isCardMediaHovered: hoveredCardIdx === idx ? true : false,
                }}
              />
            </div>
          )
      )}
    </Masonry>
  );
};

export default PostsGrid;
