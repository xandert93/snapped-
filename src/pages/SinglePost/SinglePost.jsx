import { usePostsCollection } from '../../custom-hooks';
import { useSelector } from 'react-redux';

import { PreLoader } from '../../components/App/components';
import { PostCard } from '../../components';

export default function SinglePost() {
  usePostsCollection();

  const post = useSelector((state) => state.posts.singlePost);

  return post ? <PostCard post={post} /> : <PreLoader />;
}
