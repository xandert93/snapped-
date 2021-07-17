import { useParams } from 'react-router-dom';
import { usePostsCollection } from '../../custom-hooks';
import { ImageGrid } from '../../components/ImageGrid';
import { useSelector } from 'react-redux';

const Explore = () => {
  const { tag } = useParams();

  usePostsCollection(null, tag);

  const posts = useSelector((state) => state.posts.explore);

  return (
    <>
      <h1>Explore #{tag}</h1>
      <h3>
        {posts.length} post{posts.length !== 1 && 's'}
      </h3>
      <ImageGrid posts={posts} />
    </>
  );
};

export default Explore;
