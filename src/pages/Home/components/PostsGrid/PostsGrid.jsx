import React from 'react';
import PostCard from './PostCard';
import useStyles from './styles';
import { Grid } from '@material-ui/core';
import { useEffect } from 'react';

const PostsGrid = ({
  innerWidth,
  posts,
  numOfPostsShown,
  setNumOfPostsShown,
  toggleModal,
}) => {
  const classes = useStyles();
  const isMobile = innerWidth < 600;

  const isPostsExhausted = posts.length <= numOfPostsShown;

  useEffect(() => {
    if (isPostsExhausted) return;
    //when ↑ flips to true, cleanup (see ↓) is run, useEffects runs again and exits
    window.addEventListener('scroll', scrollHandler);

    function scrollHandler() {
      const isScrolled2000pxFromEnd =
        window.scrollY + window.innerHeight > document.body.clientHeight - 2000;

      if (isScrolled2000pxFromEnd) setNumOfPostsShown((x) => x + 4);
    }

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [isPostsExhausted]);

  return (
    <Grid
      item
      sm={9}
      lg={10}
      container
      spacing={isMobile ? 0 : 2}
      className={classes.postsContainer}
      onClick={isMobile ? null : toggleModal}>
      {posts.map(
        (doc, idx) =>
          idx < numOfPostsShown && <PostCard key={doc.id} {...{ doc, idx }} />
      )}
    </Grid>
  );
};

export default PostsGrid;
