import { useContext, useEffect, useState } from 'react';
import { authContext } from '../contexts/1.auth/authContext';
import { bucket, FieldValue } from '../lib/firebase/config';
import { createPost } from '../services/firebase';
import exifr from 'exifr';
import imageCompression from 'browser-image-compression';

export function useBucket(file, description) {
  const { currentUser } = useContext(authContext);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadURL, setUploadURL] = useState('');
  const [uploadErrMsg, setUploadErrMsg] = useState('');

  useEffect(() => {
    if (!file) return;

    const uploadAndCreatePost = async () => {
      const imageRef = bucket.ref(currentUser.username + '--' + file.name);

      console.log(imageRef.name);

      const exifOrientation = await exifr.orientation(file);

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1500,
        exifOrientation,
      });

      imageRef.put(compressedFile).on(
        'state_changed',
        ({ bytesTransferred, totalBytes }) =>
          setUploadProgress((bytesTransferred / totalBytes) * 100),
        (err) => setUploadErrMsg(err.message),
        async () => {
          const url = await imageRef.getDownloadURL();

          const newPost = {
            userId: currentUser.userId,
            username: currentUser.username,
            description,
            likes: [],
            comments: [],
            url,
            fileName: imageRef.name,
            createdAt: FieldValue.serverTimestamp(),
          };

          await createPost(newPost);
          setUploadURL(url);
        }
      );
    };

    uploadAndCreatePost();
  }, [file]);

  return { uploadProgress, uploadURL, uploadErrMsg };
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
