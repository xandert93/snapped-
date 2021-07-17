import { Dialog } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { closeClickedPostDialog } from '../../../state/app/actions';

export default function PostClickDialog(props) {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.app.isClickedPostDialogOpen);

  return (
    <Dialog open={isOpen} onClose={() => dispatch(closeClickedPostDialog())}>
      Hi
    </Dialog>
  );
}
