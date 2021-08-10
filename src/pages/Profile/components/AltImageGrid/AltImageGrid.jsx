import { useSelector } from 'react-redux';
import { ImageGrid } from '../../../../components';
import { selectAltUserPosts } from '../../../../state/posts/selectors';

export default function AltImageGrid() {
  const altUserPosts = useSelector(selectAltUserPosts);

  return <ImageGrid posts={altUserPosts} clickHandler={() => {}} />;
}
