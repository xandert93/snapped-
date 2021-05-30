import React, { useContext, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import {
  ChatBubbleOutline,
  Create,
  ExpandMore,
  Favorite,
  FavoriteBorderTwoTone,
  Schedule,
} from '@material-ui/icons';
import useStyles from './styles';
import moment from 'moment';
import { Link } from 'react-router-dom';
import authContext from '../../../../../contexts/auth/authContext';
import {
  updatePostComments,
  updatePostLikes,
} from '../../../../../services/firebase';

const PostCard = ({
  doc: {
    id,
    createdAt,
    username,
    userId,
    description: { location, caption },
    isLikedByUser,
    likes,
    comments,
    url,
  },
  idx,
}) => {
  const { currentUserDoc } = useContext(authContext);
  const classes = useStyles();

  const [liked, setLiked] = useState(isLikedByUser);
  const [currentNumOfLikes, setCurrentNumOfLikes] = useState(likes.length);
  const [currentComments, setCurrentComments] = useState(comments);
  const [commentText, setCommentText] = useState('');

  const [expand, setExpand] = useState(false);
  //all cards now hold state. Better to have something that ensures only one card expanded at a time?

  const likeHandler = async () => {
    setLiked((liked) => !liked); //immediately reflected in UI

    await updatePostLikes(id, currentUserDoc.userId, !liked); //updates DB
    //^should be in useEffect following "liked" state update, but, since toggling, easier way
    //is to pass fresh "liked" value via "!liked"

    setCurrentNumOfLikes((x) => (!liked ? x + 1 : x - 1)); //updates "x likes" afterwards
  };

  const commentHandler = async () => {
    let commentObj = {
      username: currentUserDoc.username,
      text: commentText,
    };
    await updatePostComments(id, commentObj);
    setCommentText('');
    setCurrentComments([...currentComments, commentObj]);
  };

  const commentRef = useRef();

  return (
    <Grid item xs={12} sm={9} md={6} lg={4}>
      <Card raised>
        <CardActionArea
          component={Link}
          to={
            username === currentUserDoc.username
              ? '/camera-roll'
              : `/p/${username}`
          }>
          <CardHeader
            className={classes.cardHeader}
            avatar={<Avatar>{username[0].toUpperCase()}</Avatar>}
            title={username}
            titleTypographyProps={{
              variant: 'body1',
              className: classes.cardTitle,
            }}
            subheader={location}
            subheaderTypographyProps={{ variant: 'body2' }}
          />
        </CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          data-index={idx}
          image={url}
          title={`${username}'s picture`}
        />
        {/* <CardContent className={classes.cardContentPrimary}>
          <Box>
            <Schedule className={classes.clockIcon} />
            <Typography
              variant="body2"
              component="span"
              className={classes.clockText}>
              {moment(createdAt.toDate()).fromNow()}
            </Typography>
          </Box>
          <IconButton
            className={`${classes.expandMoreCollapsed} ${
              expand ? classes.expanded : ''
            }`}
            onClick={() => setExpand(!expand)}>
            <ExpandMore />
          </IconButton> */}

        <CardContent>
          <IconButton onClick={likeHandler}>
            {!liked ? (
              <FavoriteBorderTwoTone color="action" />
            ) : (
              <Favorite color="secondary" />
            )}
          </IconButton>
          <IconButton onClick={() => commentRef.current.focus()}>
            <ChatBubbleOutline />
          </IconButton>
          {currentNumOfLikes ? (
            <Typography>
              {currentNumOfLikes} like{currentNumOfLikes !== 1 && 's'}
            </Typography>
          ) : null}
          <Typography gutterBottom>{caption}</Typography>
          <Box>
            <Schedule className={classes.clockIcon} />
            <Typography
              className={classes.clockText}
              variant="body2"
              component="span">
              {moment(createdAt.toDate()).fromNow()}
            </Typography>
          </Box>

          {!currentComments.length
            ? null
            : currentComments.map(({ username, text }) => (
                <Typography gutterBottom key={`${username}-${text}`}>
                  <strong>{username}</strong> {text}
                </Typography>
              ))}

          <TextField
            label={
              !currentComments.length
                ? 'Be the first to comment!'
                : 'Make a comment!'
            }
            size="small"
            inputRef={commentRef}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton
                    color="secondary"
                    onClick={commentHandler}
                    disabled={!commentText}>
                    <Create />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>

        {/* </CardContent> */
        /* <Collapse in={expand} timeout={800} unmountOnExit>
          <CardContent>
            <Typography>{caption}</Typography>
          </CardContent>
        </Collapse> */}
      </Card>
    </Grid>
  );
};

export default PostCard;
