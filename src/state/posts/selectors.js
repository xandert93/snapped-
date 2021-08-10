export const selectIsPostsLoading = (state) => state.posts.isPostsLoading;

export const selectTimelinePosts = (state) => Object.values(state.posts.timeline);

export const selectUserPosts = (state) => Object.values(state.posts.user);

export const selectAltUserPosts = (state) => Object.values(state.posts.altUser);

export const selectExplorePosts = (state) => Object.values(state.posts.explore);
