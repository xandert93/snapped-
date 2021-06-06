import { useContext } from 'react';
import { profileContext } from '../../../../contexts/4.profile/profileContext';
import ImageGrid from './ImageGrid';

const AltImageGrid = () => {
  const { posts, noOfReqdPosts } = useContext(profileContext);

  return <ImageGrid posts={posts} noOfReqdPosts={noOfReqdPosts} />;
};

export default AltImageGrid;
