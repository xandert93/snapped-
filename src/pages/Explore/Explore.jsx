import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';
import { ImageGrid } from '../../components/ImageGrid';
import { useSelector } from 'react-redux';
import { isLoadingSelector } from '../../state/posts/selectors';
import { CircularProgress } from '@material-ui/core';

export default function Explore() {
  useSetDocumentTitle('Explore');

  usePostsCollection();

  const isLoading = useSelector(isLoadingSelector);
  const posts = useSelector((state) => state.posts.explore);

  return (
    <>
      <h1>Explore #tag</h1>
      <h3>
        {posts.length} post{posts.length !== 1 && 's'}
      </h3>
      {isLoading ? <CircularProgress size="20vh" /> : <ImageGrid posts={posts} />}
    </>
  );
}
