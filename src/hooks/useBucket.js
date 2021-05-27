import { useEffect, useState } from 'react';
import { bucket, db, FieldValue } from '../lib/firebase/config';

const useBucket = ({ uid, email }, file, description, collectionName) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadURL, setUploadURL] = useState('');
  const [uploadErrMsg, setUploadErrMsg] = useState('');

  useEffect(() => {
    if (!file) return;
    const storedItemRef = bucket.ref(file.name);
    const collectionRef = db.collection(collectionName);

    storedItemRef.put(file).on(
      'state_changed',
      ({ bytesTransferred, totalBytes }) =>
        setUploadProgress((bytesTransferred / totalBytes) * 100),
      (err) => setUploadErrMsg(err.message),
      async () => {
        const url = await storedItemRef.getDownloadURL();
        await collectionRef.add({
          userId: uid,
          username: email.slice(0, email.indexOf('@')),
          description,
          url,
          createdAt: FieldValue.serverTimestamp(),
        });
        setUploadURL(url);
      }
    );
  }, [file]);

  return { uploadProgress, uploadURL, uploadErrMsg };
};

export default useBucket;
