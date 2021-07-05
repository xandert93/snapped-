import React, { useContext, useRef, useState } from 'react';
import { ConfirmationDialog, Link } from '../../../../../components';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  ClickAwayListener,
  Collapse,
  Fade,
  Grow,
  IconButton,
  Input,
  InputAdornment,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Typography,
} from '@material-ui/core';
import {
  ChatBubbleOutline,
  Create,
  Delete,
  Edit,
  Favorite,
  FavoriteBorderTwoTone,
  MoreVert,
  Schedule,
} from '@material-ui/icons';
import useStyles from './styles';
import moment from 'moment';
import { authContext } from '../../../../../contexts/1.auth/authContext';
import {
  deletePost,
  updatePostComments,
  updatePostLikes,
} from '../../../../../services/firebase';
import { Pagination } from '@material-ui/lab';

let wasTouchedTwice = false;

const PostCard = ({
  post: {
    id,
    createdAt,
    username,
    description: { location, caption, tags },
    isLikedByUser,
    likes,
    comments,
    url,
    fileName,
  },
  idx,
  isVPxs,
  // isCardMediaHovered,
}) => {
  const { currentUser } = useContext(authContext);
  const classes = useStyles(); // <-- { isCardMediaHovered }

  const [liked, setLiked] = useState(isLikedByUser);
  const [currentNumOfLikes, setCurrentNumOfLikes] = useState(likes.length);
  const [currentComments, setCurrentComments] = useState(comments);
  const [sliceNum, setSliceNum] = useState(3);
  const [commentText, setCommentText] = useState('');

  const commentRef = useRef();

  const likeHandler = async () => {
    setLiked((liked) => !liked); //immediately reflected in UI

    await updatePostLikes(id, currentUser.username, !liked); //updates DB
    //^should be in useEffect following "liked" state update, but, since toggling, easier way
    //is to pass fresh "liked" value via "!liked"

    setCurrentNumOfLikes((x) => (!liked ? x + 1 : x - 1)); //updates "x likes" afterwards
  };

  const newCommentHandler = async () => {
    let commentObj = {
      username: currentUser.username,
      text: commentText,
    };
    await updatePostComments(id, commentObj);
    setCommentText('');
    setCurrentComments([...currentComments, commentObj]);
    pageChangeHandler(null, Math.ceil((currentComments.length + 1) / 3));
  };

  const touchHandler = (e) => {
    if (!wasTouchedTwice) {
      wasTouchedTwice = true;
      return setTimeout(() => (wasTouchedTwice = false), 300);
    }
    likeHandler();
  };

  const [pageNo, setPageNo] = useState(1);

  const pageChangeHandler = (e, newPageNo) => {
    setPageNo(newPageNo);
    setSliceNum(3 * newPageNo);
  };

  const [openPopper, setOpenPopper] = useState(false);

  const anchorRef = useRef();

  return (
    <Card className={classes.postCard} raised>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Link to={`/p/${username}`}>
            <Avatar className={classes.cardAvatar} src={url}>
              {username[0].toUpperCase()}
            </Avatar>
          </Link>
        }
        title={<Link to={`/p/${username}`}>{username}</Link>}
        titleTypographyProps={{
          variant: 'body1',
          // className: classes.cardTitle,
        }}
        subheader={location}
        subheaderTypographyProps={{
          variant: 'subtitle2',
          // className: classes.cardSubheader,
        }}
        action={
          username === currentUser.username && (
            <>
              <IconButton
                ref={anchorRef}
                onClick={() => setOpenPopper((x) => !x)}>
                <MoreVert color="primary" />
              </IconButton>
              <Popper
                open={openPopper}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                transition
                disablePortal>
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps}>
                    <Paper>
                      <ClickAwayListener
                        onClickAway={() => setOpenPopper(false)}>
                        <MenuList>
                          <MenuItem
                            className={classes.popperItem}
                            onClick={() => setOpenPopper(false)}>
                            <Box
                              className={classes.popperItemOverlay}
                              data-role="Edit Post"
                              data-posts-idx={idx}
                            />
                            <Edit color="primary" />
                          </MenuItem>
                          <MenuItem
                            className={classes.popperItem}
                            onClick={() => setOpenPopper(false)}>
                            <Box
                              className={classes.popperItemOverlay}
                              data-role="Delete Post"
                              data-posts-idx={idx}
                            />
                            <Delete color="secondary" />
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          )
        }
      />

      <Fade in timeout={4000}>
        <CardMedia
          className={classes.cardMedia}
          data-posts-idx={idx}
          image={url}
          title={`Photo by ${username} @ ${location} with taggedPerson.`}
          onTouchStart={touchHandler}
        />
      </Fade>

      <CardContent>
        <Typography className={classes.cardTags} variant="body2">
          {tags.map((tag) => (
            <Link key={tag} to={`/explore/tags/${tag}`}>
              #{tag}{' '}
            </Link>
          ))}
        </Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Box>
          <IconButton onClick={likeHandler}>
            {!liked ? (
              <FavoriteBorderTwoTone color="primary" />
            ) : (
              <Favorite color="secondary" />
            )}
          </IconButton>

          <Typography variant="caption" component="p">
            {currentNumOfLikes} like{currentNumOfLikes !== 1 && 's'}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={() => commentRef.current.focus()}>
            <ChatBubbleOutline color="primary" className={classes.commentSVG} />
          </IconButton>
          <Typography variant="caption" component="p">
            {currentComments.length} comment
            {currentComments.length !== 1 && 's'}
          </Typography>
        </Box>
      </CardActions>

      <CardContent>
        <Typography className={classes.cardCaption} variant="body1">
          {caption}
        </Typography>
      </CardContent>

      <CardContent className={classes.cardContent3}>
        {!!currentComments.length &&
          currentComments
            .slice(sliceNum - 3, sliceNum)
            .map(({ username, text }) => (
              <Typography
                variant="body2"
                gutterBottom
                key={`${username}-${text}`}>
                <Link to={`/p/${username}`}>
                  <strong>{username}</strong>
                </Link>{' '}
                {text}
              </Typography>
            ))}

        {currentComments.length > 3 && (
          <Box my={1.5}>
            <Pagination
              count={Math.ceil(currentComments.length / 3)}
              onChange={pageChangeHandler}
              page={pageNo}
              variant="outlined"
              shape="rounded"
              size="small"
            />
          </Box>
        )}

        <Input
          className={classes.commentInput}
          placeholder={
            !currentComments.length
              ? 'Be the first to comment!'
              : 'Leave a comment!'
          }
          inputRef={commentRef}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyUp={(e) =>
            e.key === 'Enter' && commentText && newCommentHandler()
          }
          endAdornment={
            <InputAdornment>
              <IconButton
                color="secondary"
                onClick={newCommentHandler}
                disabled={!commentText}>
                <Create fontSize="small" />
              </IconButton>
            </InputAdornment>
          }
        />
        <Box mt={1.5}>
          <Schedule color="secondary" className={classes.clockIcon} />
          <Typography
            className={classes.clockText}
            variant="caption"
            component="span">
            {moment(createdAt.toDate()).fromNow()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;
