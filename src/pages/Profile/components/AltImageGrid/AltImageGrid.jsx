import { useSelector } from 'react-redux';
import { ImageGrid } from '../../../../components';

export default function AltImageGrid() {
  const altUserPosts = useSelector((state) => state.posts.altUser);

  return <ImageGrid posts={altUserPosts} clickHandler={() => {}} />;
}
