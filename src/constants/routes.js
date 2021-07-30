export const ROUTES = {
  AUTH: '/auth/:pageName',
  HOME: '/home',
  USER_PROFILE: '/profiles/:username/:tabName',
  ALT_PROFILE: '/profiles/:username',
  EXPLORE: '/explore/tags/:tag',
  SINGLE_POST: '/posts/:postId',
  SEARCH: '/search', //query string is a separate entity from "pathname", so "/search" still matches irrespective of the query string
  ACCOUNT: '/account',
  NOT_FOUND: '/404',
};

//^patterns --> can be checked via const { path } = useRouteMatch();

export const buildProfilePath = (username) => `/profiles/${username}`;
export const buildExplorePath = (tag) => `/explore/tags/${tag}`;
export const buildPostPath = (id) => `/posts/${id}`;
export const buildSearchPath = (searchTerm) => `/search?search_query=${searchTerm}`; //replaces value whitespaces with "%20" for us
