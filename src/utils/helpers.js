import exifr from 'exifr';
import imageCompression from 'browser-image-compression';

export const isFileImage = (file) => {
  return ['image/png', 'image/jpeg'].includes(file.type);
};

export const isFileSizeSmall = (file) => {
  return file.size < 12582912;
};

export const formatTags = (arr) =>
  !arr.length
    ? arr
    : arr
        .join(',')
        .replace(/[#,.]/g, ' ') //remove all hashtags/commas/periods from String, for ""
        .trim() //remove any " " at start or end
        .split(/[ ,]+/); //split into array, using whitespace+ or comma+ as delimiter

export const createCompressedFile = async (file) => {
  const exifOrientation = await exifr.orientation(file);

  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1500,
    exifOrientation,
  });

  return compressedFile;
};

export const areArraysDifferent = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return true;
  if (JSON.stringify(arr1.sort()) !== JSON.stringify(arr2.sort())) return true;
  else return false;
};

export const numOf = (num, str) => `${num} ${str}${num !== 1 ? 's' : ''}`;
