import {
  Box,
  CircularProgress,
  Grid,
  GridList,
  GridListTile,
  useMediaQuery,
} from '@material-ui/core';
import { useGridScroll } from '../../custom-hooks';

import { TileOverlay } from './TileOverlay';
import useStyles from './styles';
import { useSelector } from 'react-redux';
import { isLoadingSelector } from '../../state/posts/selectors';

export default function ImageGrid({ posts, clickHandler }) {
  const classes = useStyles();
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.down('xs'));
  const isVPsm = useMediaQuery(({ breakpoints }) => breakpoints.down('sm'));
  const isVPmd = useMediaQuery(({ breakpoints }) => breakpoints.down('md'));

  const noOfPostsShown = useGridScroll(15, posts.length, 500);

  const isLoading = useSelector(isLoadingSelector);

  return (
    <Box className={classes.root}>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <GridList
          className={classes.gridList}
          cellHeight={isVPxs ? 150 : isVPsm ? 200 : isVPmd ? 250 : 300}
          cols={isVPmd ? 3 : 4}>
          {posts.map(
            ({ id, username, url, likes, comments }, idx) =>
              idx < noOfPostsShown && (
                <GridListTile
                  key={id}
                  className={classes.tile}
                  cols={1}
                  onClick={() => clickHandler(id)}>
                  <img src={url} alt={`${username}'s post`} />
                  {!isVPsm && (
                    <TileOverlay
                      noOfLikes={likes.length}
                      noOfComments={comments.length}
                    />
                  )}
                </GridListTile>
              )
          )}
        </GridList>
      )}
    </Box>
  );

  return (
    !!posts.length && (
      <Grid container onClick={clickHandler}>
        {posts.map(
          ({ id, username, url, likes, comments }, idx) =>
            idx < noOfPostsShown && (
              <Grid key={id} item xs={4} md={3}>
                <Box className={classes.imageBox}>
                  <img
                    src={url}
                    data-post-idx={idx}
                    alt={`${username}'s post`}
                    className={classes.image}
                  />
                  {!isVPsm && (
                    <TileOverlay
                      idx={idx}
                      noOfLikes={likes.length}
                      noOfComments={comments.length}
                    />
                  )}
                </Box>
              </Grid>
            )
        )}
      </Grid>
    )
  );
}
