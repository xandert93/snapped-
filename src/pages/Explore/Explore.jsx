import { usePostsCollection, useSetDocumentTitle } from '../../custom-hooks';
import { ImageGrid } from '../../components/ImageGrid';
import { useSelector } from 'react-redux';
import { selectExplorePosts, selectIsPostsLoading } from '../../state/posts/selectors';
import { CircularProgress } from '@material-ui/core';
import { numOf } from '../../utils/helpers';

export default function Explore() {
  useSetDocumentTitle('Explore');

  usePostsCollection();

  const isPostsLoading = useSelector(selectIsPostsLoading);
  const posts = useSelector(selectExplorePosts);
  let postsCount = posts.length;

  return (
    <>
      <h1>Explore #tag</h1>
      <h3>{numOf(postsCount, 'post')}</h3>
      {isPostsLoading ? <CircularProgress size="20vh" /> : <ImageGrid posts={posts} />}
    </>
  );
}
