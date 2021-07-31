import { createContext, useState, useCallback, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { updatePostLikes } from '../../state/posts/actions';

import { Card } from '@material-ui/core';
import { CardHeader, CardMedia, CardTags, CardActions, CardCaption, CardComments, CardFooter } from './components';
import useStyles from './styles';

const maxCommentsShown = 3; //maximum no of comments shown in UI at any given time

export const CardContext = createContext();

function PostCard({ post }) {
  const classes = useStyles();

  const {
    id,
    createdAt,
    username,
    description: { location, caption, tags },
    isLikedByUser,
    likes,
    comments,
    url,
  } = post;

  //"likes" is an array of usernames and "comments" is an array of comment objects

  // console.log('rendered', id); --> see if memo functionality working properly

  const dispatch = useDispatch();

  //USER LIKE POST
  const [uiIsLikedByUser, setUIisLikedByUser] = useState(isLikedByUser);
  const [uiLikesCount, setUILikesCount] = useState(likes.length);

  const handleHeartIconClick = useCallback(async () => {
    setUIisLikedByUser((x) => !x); //immediately reflected in UI
    dispatch(updatePostLikes(id, !uiIsLikedByUser)); //Firebase + Redux Store
    setUILikesCount((x) => x + (!uiIsLikedByUser ? 1 : -1));
  }, [uiIsLikedByUser, uiLikesCount]);

  //COMMENTS PAGINATION
  const commentsCount = comments.length;
  const [pageSliceIndex, setPageSliceIndex] = useState(maxCommentsShown);
  const [pageNum, setPageNum] = useState(1);

  const calcPageCount = (num = 0) => Math.ceil((commentsCount + num) / maxCommentsShown);

  const handlePageChange = useCallback((e, newPageNum) => {
    setPageNum(newPageNum);
    setPageSliceIndex(maxCommentsShown * newPageNum);
  }, []);

  const commentInputRef = useRef();

  const contextValue = {
    id,
    username,
    uiIsLikedByUser,
    uiLikesCount,
    handleHeartIconClick,
    commentsCount,
    pageNum,
    pageSliceIndex,
    calcPageCount,
    handlePageChange,
    maxCommentsShown,
    commentInputRef,
  };

  return (
    <CardContext.Provider value={contextValue}>
      <Card className={classes.postCard} raised>
        <CardHeader location={location} />
        <CardMedia url={url} />
        <CardTags tags={tags} />
        <CardActions />
        <CardCaption caption={caption} />
        <CardComments comments={comments} />
        <CardFooter createdAt={createdAt} />
      </Card>
    </CardContext.Provider>
  );
}

export default memo(PostCard);
