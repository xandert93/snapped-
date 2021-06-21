export const formatTagsToArr = (str) =>
  str
    .replaceAll('#', '') //remove hashtags from user
    .split(/[ ,]+/); //split into array, using whitespace or comma as delimiter
