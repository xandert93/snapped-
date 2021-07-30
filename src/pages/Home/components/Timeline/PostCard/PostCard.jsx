import { useRef, useState } from 'react';

import { Card } from '@material-ui/core';
import useStyles from './styles';

import { useDispatch, useSelector } from 'react-redux';
import { userUsernameSelector } from '../../../../../state/auth/selectors';

import {
  createPostComment,
  deletePostComment,
  updatePostLikes,
} from '../../../../../state/posts/actions';
import {
  CardHeader,
  CardMedia,
  CardTags,
  CardActions,
  CardCaption,
  CardComments,
  CardFooter,
} from './components';

let wasTouchedTwice = false;

export default function PostCard({ post, clickHandlers }) {
  const classes = useStyles();

  const {
    id,
    createdAt,
    username,
    description: { location, caption, tags },
    isLikedByUser: initialIsLikedByUser,
    likes: initialLikes, //array of usernames
    comments: initialComments, //array of comment objects
    url,
  } = post;

  const dispatch = useDispatch();
  const userUsername = useSelector(userUsernameSelector);

  const maxCommentsShown = 3; //maximum no of comments shown in UI at any given time

  const [isLikedByUser, setIsLikedByUser] = useState(initialIsLikedByUser);
  const toggleLike = () => setIsLikedByUser((x) => !x);

  const [likesCount, setLikesCount] = useState(initialLikes.length);

  const [comments, setComments] = useState(initialComments);
  const commentsCount = comments.length;
  const [sliceIdx, setSliceIdx] = useState(maxCommentsShown);
  const [commentText, setCommentText] = useState('');

  const getPageCount = (num = 0) => {
    return Math.ceil((commentsCount + num) / maxCommentsShown);
  };

  const commentInputRef = useRef();

  const handleNewComment = async () => {
    let newComment = {
      username: userUsername,
      text: commentText,
    };
    dispatch(createPostComment(id, newComment));
    setCommentText('');
    setComments([...comments, newComment]);
    handlePageChange(null, getPageCount(1));
  };

  const handleHeartClick = async () => {
    toggleLike(); //immediately reflected in UI
    dispatch(updatePostLikes(id, userUsername, !isLikedByUser)); //Firebase + Redux Store
    setLikesCount((x) => x + (!isLikedByUser ? 1 : -1));
  };

  const [pageNum, setPageNum] = useState(1);

  const handlePageChange = (e, newPageNum) => {
    setPageNum(newPageNum);
    setSliceIdx(maxCommentsShown * newPageNum);
  };

  const handleTouch = (e) => {
    if (!wasTouchedTwice) {
      wasTouchedTwice = true;
      return setTimeout(() => (wasTouchedTwice = false), 300);
    }
    handleHeartClick();
    setShowHeart(true);
    setTimeout(setShowHeart, 600, false);
  };

  const handleInputChange = (e) => setCommentText(e.target.value);

  const handleCommentDoubleClick = async (commentToDelete) => {
    dispatch(deletePostComment(id, commentToDelete));
    setComments((x) => x.filter((comment) => comment !== commentToDelete));
    handlePageChange(null, getPageCount(-1));
  };

  const [showHeart, setShowHeart] = useState(false);

  const isUserCard = username === userUsername;

  return (
    <Card className={classes.postCard} raised>
      <CardHeader {...{ id, isUserCard, location, username, clickHandlers }} />
      <CardMedia {...{ id, url, username, location, handleTouch, showHeart }} />
      <CardTags {...{ tags }} />
      <CardActions
        {...{
          handleHeartClick,
          isLikedByUser,
          likesCount,
          commentsCount,
          commentInputRef,
        }}
      />
      <CardCaption {...{ caption }} />
      <CardComments
        {...{
          maxCommentsShown,
          commentsCount,
          comments,
          sliceIdx,
          handleCommentDoubleClick,
          userUsername,
          handlePageChange,
          pageNum,
          handleNewComment,
          commentText,
          handleInputChange,
          commentInputRef,
          getPageCount,
        }}
      />
      <CardFooter {...{ createdAt }} />
    </Card>
  );
}
