import React, { useState } from 'react';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Typography,
} from '@material-ui/core';
import { ExpandMore, MyLocation, Today } from '@material-ui/icons';
import useStyles from './styles';

const PostCard = ({
  imgDoc: {
    username,
    description: { location, date, description },
    url,
  },
  idx,
}) => {
  const classes = useStyles();
  const [expand, setExpand] = useState(false);
  //all cards now hold state. Better to have something that ensures only one card expanded at a time?

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card raised>
        <CardHeader
          avatar={<Avatar>{username[0]}</Avatar>}
          title={username}
          subheader={
            <>
              <MyLocation />
              {`${location}`}
            </>
          }></CardHeader>

        <CardMedia
          className={classes.cardMedia}
          data-index={idx}
          image={url}
          title={`${username}'s picture.`}></CardMedia>
        <CardContent>
          <Typography variant="body2" gutterBottom>
            <Today /> {date}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton
            className={`${classes.collapsed} ${expand ? classes.expand : ''}`}
            onClick={() => setExpand(!expand)}>
            <ExpandMore />
          </IconButton>
        </CardActions>

        <Collapse in={expand} timeout={800} unmountOnExit>
          <CardContent>
            <Typography>{description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default PostCard;