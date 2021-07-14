import { CloudUpload } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../../../state/upload/actions';

import { PostForm } from '../../../PostForm';

const CreatePostForm = () => {
  const dispatch = useDispatch();
  const { fileData, dataURL } = useSelector((state) => state.upload);

  //when createPost called --> !file ? <PostForm/> (now unmounts) : <Progress/> (now mounts)

  return (
    <PostForm
      imageURL={dataURL}
      submitIcon={<CloudUpload color="inherit" />}
      submitHandler={(description) =>
        dispatch(createPost(description, fileData.file))
      }
    />
  );
};

export default CreatePostForm;
