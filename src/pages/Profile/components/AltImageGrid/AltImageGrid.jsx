import { useContext } from 'react';
import { ImageGrid } from '../../../../components';
import { profileContext } from '../../../../contexts/5.profile/profileContext';

const AltImageGrid = () => {
  const { posts } = useContext(profileContext);

  return <ImageGrid posts={posts} />;
};

export default AltImageGrid;
