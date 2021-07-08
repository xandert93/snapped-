import exifr from 'exifr';
import imageCompression from 'browser-image-compression';

export const formatTagsToArr = (str) =>
  str
    .replace(/#/g, ' ') //remove all hashtags from String, for ""
    .trim() //remove any "" at start or end
    .split(/[ ,]+/); //split into array, using whitespace or comma as delimiter

export const isCardMedia = (node) =>
  typeof node.className === 'string' && node.className.includes('MuiCardMedia');

export const createCompressedFile = async (file) => {
  const exifOrientation = await exifr.orientation(file);

  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1500,
    exifOrientation,
  });

  return compressedFile;
};
