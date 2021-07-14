import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { bucket, FieldValue } from '../lib/firebase/config';
import { createPost } from '../services/firebase/firestore';
import { userSelector } from '../state/selectors';
import { createCompressedFile } from '../utils/helpers';

export function useBucket(file, description) {
  const user = useSelector(userSelector);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [firestoreDoc, setFirestoreDoc] = useState(null);
  const [uploadErrMsg, setUploadErrMsg] = useState('');

  useEffect(() => {
    if (!file) return;

    const uploadAndCreatePost = async () => {
      const imageRef = bucket.ref(user.username + '--' + file.name);

      const compressedFile = await createCompressedFile(file);

      imageRef.put(compressedFile).on(
        'state_changed',
        ({ bytesTransferred, totalBytes }) =>
          setUploadProgress((bytesTransferred / totalBytes) * 100),
        (err) => setUploadErrMsg(err.message),
        async () => {
          const url = await imageRef.getDownloadURL();

          const newPost = {
            userId: user.userId,
            username: user.username,
            description,
            likes: [],
            comments: [],
            url,
            fileName: imageRef.name,
            createdAt: FieldValue.serverTimestamp(),
          };

          setFirestoreDoc(await createPost(newPost));
        }
      );
    };

    uploadAndCreatePost();
  }, [file]);

  return { uploadProgress, firestoreDoc, uploadErrMsg };
}

/*When image is compressed, it is stripped of its EXIF data. This is problematic because the EXIF
data contains an "orientation" property that determines the image's orientation when the image
is displayed on any device. As a result, the compressed image would permanently be in landscape*.

Thus, we use the exifr package to extract the actual image's "orientation" (has values between
1 and 8, representing descriptions e.g. 1 = "top, left", 6 = "right, top" etc.). Given the intricacy
and difficulty of extracting this bit of data in plain JS, I've used an external library instead.

Once we get it, we can apply it in the "imageCompression"'s options to ensure that it is maintained 
in the compressed image. Again, given the intricacy of compressing an image in plain JS, I've 
used an external library instead. Whilst the compression is inevitably performed client-side,
it is not intensive at all, and it is extremely fast.
*/
