import { useContext } from 'react';
import { profileContext } from '../../../../contexts/4.profile/profileContext';
import ImageGrid from './ImageGrid';

const UserImageGrid = () => {
  const { tabbedPosts, noOfReqdPosts, gridClickHandler } =
    useContext(profileContext);

  return (
    <ImageGrid
      posts={tabbedPosts}
      noOfReqdPosts={noOfReqdPosts}
      clickHandler={gridClickHandler}
    />
  );
};

export default UserImageGrid;
