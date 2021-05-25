import React, { useContext, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ExpandMore, MyLocation, Schedule, Today } from '@material-ui/icons';
import useStyles from './styles';
import moment from 'moment';
import { Link } from 'react-router-dom';
import authContext from '../../../../../contexts/auth/authContext';

const PostCard = ({
  doc: {
    createdAt,
    username,
    userId,
    description: { location, caption },
    url,
  },
  idx,
}) => {
  const { currentUser } = useContext(authContext);
  const classes = useStyles();
  const [expand, setExpand] = useState(false);
  //all cards now hold state. Better to have something that ensures only one card expanded at a time?

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card raised>
        <CardActionArea
          component={Link}
          to={userId !== currentUser.uid ? `/user/${userId}` : '/camera-roll'}>
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
        <CardContent className={classes.cardContentPrimary}>
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
          </IconButton>
        </CardContent>

        <Collapse in={expand} timeout={800} unmountOnExit>
          <CardContent>
            <Typography>{caption}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default PostCard;
