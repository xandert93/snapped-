import { useDispatch, useSelector } from 'react-redux';
import { closePostUploadDialog } from '../../../state/app/actions';
import { PostDialog } from '../../PostDialog';
import { PostCreationForm } from './PostCreationForm';
import { Progress } from './Progress';

export default function PostUploadDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.isPostUploadDialogOpen);
  const { file } = useSelector((state) => state.upload);

  return (
    <PostDialog
      isOpen={isOpen}
      close={() => dispatch(closePostUploadDialog())}
      title="Create Your Post!">
      {!file ? <PostCreationForm /> : <Progress />}
    </PostDialog>
  );
}
