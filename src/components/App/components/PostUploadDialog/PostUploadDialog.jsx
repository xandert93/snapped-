import { useDispatch, useSelector } from 'react-redux';
import { closePostUploadDialog } from '../../../../state/app/actions';
import { PostDialog } from '../../../PostDialog';
import { PostCreationForm } from './PostCreationForm';
import { Progress } from './Progress';

export default function PostUploadDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.isPostUploadDialogOpen);
  const confirmedFile = useSelector((state) => state.upload.confirmedFile);

  return (
    <PostDialog
      isOpen={isOpen}
      close={() => dispatch(closePostUploadDialog())}
      title="Create Your Post!">
      {!confirmedFile ? <PostCreationForm /> : <Progress />}
    </PostDialog>
  );
}
