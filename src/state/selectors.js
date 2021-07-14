export const userSelector = (state) => state.auth.user;

export const userDetailsSelector = (state) => state.authForms.userDetails;

export const snackbarSelector = (state) => state.app.snackbar;

export const isSubmittingSelector = (state) => state.app.isSubmitting;
