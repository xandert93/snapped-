import { useContext } from 'react';
import { ImageGrid } from '../../../../components';
import { profileContext } from '../../../../contexts/4.profile/profileContext';
import TempGetMoreButtons from '../TempGetMoreButtons';

const AltImageGrid = () => {
  const { posts, noOfPosts, noOfReqdPosts, setNoOfReqdPosts } =
    useContext(profileContext);

  return (
    <>
      <ImageGrid posts={posts} noOfReqdPosts={noOfReqdPosts} />
      <TempGetMoreButtons
        {...{ posts, noOfPosts, noOfReqdPosts, setNoOfReqdPosts }}
      />
    </>
  );
};

export default AltImageGrid;
