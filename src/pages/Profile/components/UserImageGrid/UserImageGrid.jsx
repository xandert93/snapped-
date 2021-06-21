import { useContext } from 'react';
import { ImageGrid } from '../../../../components';
import { profileContext } from '../../../../contexts/5.profile/profileContext';

const UserImageGrid = () => {
  const { tabbedPosts, gridClickHandler } = useContext(profileContext);

  return <ImageGrid posts={tabbedPosts} clickHandler={gridClickHandler} />;
};

export default UserImageGrid;
