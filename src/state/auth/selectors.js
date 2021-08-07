export const fbAuthUserSelector = (state) => state.auth.fbAuthUser;

export const userSelector = (state) => state.auth.user;

export const userIdSelector = (state) => state.auth.user.id;

export const selectUserUsername = (state) => state.auth.user.username;

export const userProfilePicURLSelector = (state) => state.auth.user.profilePicURL;

export const userFollowingSelector = (state) => state.auth.user.following;
