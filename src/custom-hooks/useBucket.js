import { useContext, useEffect, useState } from 'react';
import authContext from '../contexts/auth/authContext';
import { bucket, FieldValue } from '../lib/firebase/config';
import { createPost } from '../services/firebase';

const useBucket = (file, description) => {
  const { currentUserDoc } = useContext(authContext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadURL, setUploadURL] = useState('');
  const [uploadErrMsg, setUploadErrMsg] = useState('');

  useEffect(() => {
    if (!file) return;
    const storedItemRef = bucket.ref(file.name);

    storedItemRef.put(file).on(
      'state_changed',
      ({ bytesTransferred, totalBytes }) =>
        setUploadProgress((bytesTransferred / totalBytes) * 100),
      (err) => setUploadErrMsg(err.message),
      async () => {
        const url = await storedItemRef.getDownloadURL();

        const newPost = {
          userId: currentUserDoc.userId,
          username: currentUserDoc.username,
          description,
          likes: [],
          comments: [],
          url,
          createdAt: FieldValue.serverTimestamp(),
        };

        await createPost(newPost);
        setUploadURL(url);
      }
    );
  }, [file]);

  return { uploadProgress, uploadURL, uploadErrMsg };
};

export { useBucket };
