import PostCard from './PostCard';
import useStyles from './styles';
import { Grid, useMediaQuery } from '@material-ui/core';
import { useGridScroll } from '../../../../custom-hooks';
import { useState } from 'react';
import { isCardMedia } from '../../../../utils/helpers';

const PostsGrid = ({ posts, openModal }) => {
  const classes = useStyles();
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs'));

  const initialNoOfPostsShown = isVPxs ? 4 : 8;

  const noOfPostsShown = useGridScroll(
    initialNoOfPostsShown,
    posts.length,
    2000
  );

  const [hoveredCardIdx, setHoveredCardIdx] = useState(-1);
  const mouseMoveHandler = (e) =>
    !isCardMedia(e.target)
      ? setHoveredCardIdx(-1)
      : setHoveredCardIdx(+e.target.dataset.postsIdx);

  return (
    <Grid
      className={classes.gridContainer}
      item
      container
      spacing={isVPxs ? 0 : 3}
      onMouseMove={isVPxs ? null : mouseMoveHandler}
      onClick={isVPxs ? null : openModal}>
      {posts.map(
        (post, idx) =>
          idx < noOfPostsShown && (
            <Grid
              key={post.id}
              className={classes.gridItem}
              item
              xs={12}
              md={6}
              lg={4}
              xl={3}>
              <PostCard
                {...{
                  post,
                  idx,
                  isVPxs,
                  isCardMediaHovered: hoveredCardIdx === idx ? true : false,
                }}
              />
            </Grid>
          )
      )}
    </Grid>
  );
};

export default PostsGrid;

/*
onMouseOver

function isCardMedia(node) {
  return node.className.includes("MuiCardMedia");
}

!isCardMedia(e.target) return setHoveredCardIdx(-1)
setHoveredCardIdx(e.target.dataset.postsIdx);

in CSS:

root: ({hoveredCardIdx}) => ({
  [`nth-child(${hoveredCardIdx})`]: {}
})


onMouseLeave



*/
