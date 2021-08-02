export const selectIsSubmitDisabled = (state) => {
  let { isTagsValid, isDescriptionSame } = state.postForm;
  return isDescriptionSame || !isTagsValid;
};
