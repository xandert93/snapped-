import { useDispatch, useSelector } from 'react-redux';
import { clearForm } from '../../../state/upload/actions';
import { SlidingModal } from '../../SlidingModal';
import CreatePostForm from './CreatePostForm/CreatePostForm';
import { Progress } from './Progress';

const UploadModal = () => {
  const dispatch = useDispatch();
  const { file, dataURL } = useSelector((state) => state.upload);

  return (
    <SlidingModal
      isOpen={!!dataURL}
      close={() => dispatch(clearForm())}
      title="Create Your Post!">
      {!file ? <CreatePostForm /> : <Progress />}
    </SlidingModal>
  );
};

export default UploadModal;
