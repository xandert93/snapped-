import { bucket } from '../../../lib/firebase/config';
import { createCompressedFile } from '../../../utils/helpers';

export async function fbUploadUserProfilePicture(username, file) {
  const imageRef = bucket.ref(`pfp-${username}`);
  const compressedFile = await createCompressedFile(file);
  await imageRef.put(compressedFile);
  const url = await imageRef.getDownloadURL();
  return url;
}
