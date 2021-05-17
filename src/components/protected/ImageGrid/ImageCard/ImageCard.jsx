import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@material-ui/core';
import { MyLocation, Today } from '@material-ui/icons';
import useStyles from './styles';

const ImageCard = ({
  imgDoc: {
    username,
    description: { location, date, description },
    url,
  },
  idx,
}) => {
  const classes = useStyles();

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
          <Typography>{description}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ImageCard;
