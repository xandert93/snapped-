import { useContext } from 'react';
import { ImageGrid } from '../../../../components';
import { profileContext } from '../../../../contexts/4.profile/profileContext';
import TempGetMoreButtons from '../TempGetMoreButtons';

const UserImageGrid = () => {
  const {
    tabbedPosts,
    noOfPosts,
    noOfReqdPosts,
    setNoOfReqdPosts,
    gridClickHandler,
  } = useContext(profileContext);

  return (
    <>
      <ImageGrid
        posts={tabbedPosts}
        noOfReqdPosts={noOfReqdPosts}
        clickHandler={gridClickHandler}
      />
      <TempGetMoreButtons
        {...{ posts: tabbedPosts, noOfPosts, noOfReqdPosts, setNoOfReqdPosts }}
      />
    </>
  );
};

export default UserImageGrid;
