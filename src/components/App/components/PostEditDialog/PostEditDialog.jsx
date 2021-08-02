import { useDispatch, useSelector } from 'react-redux';
import { closePostEditDialog } from '../../../../state/app/actions';

import { PostDialog } from '../../../PostDialog';
import { Check as CheckIcon } from '@material-ui/icons';

import { PostEditForm } from './PostEditForm';

export default function PostEditDialog() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.isPostEditDialogOpen);

  const close = () => dispatch(closePostEditDialog());

  return (
    <PostDialog isOpen={isOpen} close={close} title="Edit Your Post!" SubmitIcon={CheckIcon}>
      <PostEditForm />
    </PostDialog>
  );
}
