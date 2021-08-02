import { useDispatch, useSelector } from 'react-redux';
import { closePostCreateDialog } from '../../../../state/app/actions';

import { PostDialog } from '../../../PostDialog';
import { CloudUpload as CloudUploadIcon } from '@material-ui/icons';

import { PostCreateForm } from './PostCreateForm';
import { Progress } from './Progress';

export default function PostCreateDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.isPostCreateDialogOpen);
  const confirmedFile = useSelector((state) => state.upload.confirmedFile);

  const close = () => dispatch(closePostCreateDialog());

  return (
    <PostDialog isOpen={isOpen} close={close} title="Create Your Post!" SubmitIcon={CloudUploadIcon}>
      {!confirmedFile ? <PostCreateForm /> : <Progress />}
    </PostDialog>
  );
}
