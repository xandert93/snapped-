import { createContext, useContext } from 'react';

const PostCardContext = createContext();
export const PostCardProvider = PostCardContext.Provider;
export const useCard = () => useContext(PostCardContext);
