import { Box, Button, Container, Typography } from '@material-ui/core';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../../../firebase/config';

const OtherUser = () => {
  const { userId } = useParams();
  const userCollectionRef = useRef(
    db
      .collection('Image URL Data')
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
  );
  const [numOfRequestedDocs, setNumOfRequestedDocs] = useState(1);
  const [numOfAvailableDocs, setNumOfAvailableDocs] = useState(0);
  const [otherUsersImageDocs, setOtherUsersImageDocs] = useState([]);

  useEffect(() => {
    const getShit = async () => {
      const { docs: leanDocs } = await userCollectionRef.current.get();
      setNumOfAvailableDocs(leanDocs.length);
      const retrievedDocs = [];

      for (let i = 0; i < numOfRequestedDocs; i++) {
        retrievedDocs.push({ ...leanDocs[i].data(), id: leanDocs[i].id });
      }
      setOtherUsersImageDocs(retrievedDocs);
    };

    getShit();
  }, [numOfRequestedDocs]);

  const noMoreImageDocs = numOfRequestedDocs === numOfAvailableDocs;

  return (
    <Container className="camera-roll">
      <Typography variant="h4">{userId}'s posts</Typography>
      {otherUsersImageDocs.map(({ id, url }, idx) => (
        <img key={id} src={url} data-index={idx} alt="" />
      ))}
      {otherUsersImageDocs.length > 0 && (
        <Box style={{ textAlign: 'center' }}>
          <Button
            disabled={noMoreImageDocs}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs((x) => x + 1)}>
            Waste another ~4mb?
          </Button>
          <Button
            disabled={noMoreImageDocs}
            variant="contained"
            color="secondary"
            onClick={() => setNumOfRequestedDocs(numOfAvailableDocs)}>
            Or...just blow ~{numOfAvailableDocs * 3.5}MB?
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default OtherUser;
