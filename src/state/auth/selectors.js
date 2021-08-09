export const selectFbAuthUser = (state) => state.auth.fbAuthUser;

export const selectUser = (state) => state.auth.user;

export const selectUserId = (state) => state.auth.user.id;

export const selectUserUsername = (state) => state.auth.user.username;

export const selectUserProfilePicURL = (state) => state.auth.user.profilePicURL;

export const selectUserFollowings = (state) => state.auth.user.following;
