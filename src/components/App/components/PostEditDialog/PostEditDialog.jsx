import { PostDialog } from '../../../PostDialog';
import { PostEditForm } from './PostEditForm';
import { useDispatch, useSelector } from 'react-redux';
import { closePostEditDialog } from '../../../../state/app/actions';

export default function PostEditDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.isPostEditDialogOpen);
  const post = useSelector((state) => state.posts.postToEdit);

  return (
    post && (
      <PostDialog
        isOpen={isOpen}
        close={() => dispatch(closePostEditDialog())}
        title="Edit Your Post!">
        <PostEditForm imageURL={post.url} post={post} />
      </PostDialog>
    )
  );
}
