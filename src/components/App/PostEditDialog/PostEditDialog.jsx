import { PostDialog } from '../../PostDialog';
import { PostEditForm } from './PostEditForm';
import { useDispatch, useSelector } from 'react-redux';
import { closePostEditDialog } from '../../../state/app/actions';

export default function PostEditDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.isPostEditDialogOpen);
  const post = useSelector((state) => state.posts.postToEdit);

  const closeHandler = () => dispatch(closePostEditDialog());

  return (
    <PostDialog isOpen={isOpen} close={closeHandler} title="Edit Your Post!">
      {post && (
        <PostEditForm
          imageURL={post.url}
          post={post}
          closeDialog={closeHandler}
        />
      )}
    </PostDialog>
  );
}
