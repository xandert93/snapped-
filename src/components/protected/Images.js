import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { MyLocation, Today } from '@material-ui/icons';
import React, { useContext, useState } from 'react';
import authContext from '../../contexts/auth/authContext';
import useDb from '../../custom-hooks/useDb';
import UploadForm from './image-upload/UploadForm';
import ImageModal from './ImageModal';

const useStyles = makeStyles({
  imagesContainer: {
    margin: 0,
    width: '100%',
    padding: '2rem',
  },
  cardMedia: {
    height: 0,
    paddingTop: '100%',
  },
});

const Images = () => {
  const classes = useStyles();
  const { currentUser } = useContext(authContext);
  const imgDocs = useDb('Image URL Data');
  const [showModal, setShowModal] = useState(false);
  const [modalImgURL, setModalImgURL] = useState('');

  const toggleModal = (e) => {
    if (e.target.classList.contains('MuiCardMedia-root')) {
      setModalImgURL(imgDocs[e.target.dataset.index].url);
      setShowModal(true);
    }
  };

  return (
    <>
      <Typography component="h2" variant="h4">
        Welcome, {currentUser.displayName}!
      </Typography>

      <UploadForm />

      <Grid
        container
        spacing={4}
        className={classes.imagesContainer}
        onClick={toggleModal}
      >
        {imgDocs.map((imgDoc, idx) => (
          <Grid key={imgDoc.id} item xs={12} sm={6} md={4}>
            <Card raised>
              <CardHeader
                avatar={<Avatar>{imgDoc.username[0]}</Avatar>}
                title={imgDoc.username}
                subheader={
                  <>
                    <MyLocation />
                    {`${imgDoc.description.location}`}
                  </>
                }
              ></CardHeader>

              <CardMedia
                className={classes.cardMedia}
                data-index={idx}
                image={imgDoc.url}
                title={`${imgDoc.username}'s picture.`}
              ></CardMedia>
              <CardContent>
                <Typography variant="body2" gutterBottom>
                  <Today /> {imgDoc.description.date}
                </Typography>
                <Typography>{imgDoc.description.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {showModal && <ImageModal {...{ setShowModal, modalImgURL }} />}
    </>
  );
};

export default Images;
