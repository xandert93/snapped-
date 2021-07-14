import { useDispatch } from 'react-redux';
import { TextField } from '../../../../components';
import { inputChangeHandler } from '../../../../state/authForms/actions';

export default function AuthTextField(props) {
  const dispatch = useDispatch();
  const changeHandler = (e) => dispatch(inputChangeHandler(e));

  return <TextField onChange={changeHandler} {...props} />;
}
