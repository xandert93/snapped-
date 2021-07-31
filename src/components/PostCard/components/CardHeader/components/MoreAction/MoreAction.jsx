import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import { MoreVert as MoreVertIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { useCallback } from 'react';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { openPostEditDialog, setConfirmationDialog } from '../../../../../../state/app/actions';
import { deletePost, setPostToEdit } from '../../../../../../state/posts/actions';

export default function CardAction({ id }) {
  const dispatch = useDispatch();

  const anchorRef = useRef();

  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const closePopper = () => setIsPopperOpen(false);

  const handleMoreIconClick = () => {
    setIsPopperOpen(true);
    dispatch(setPostToEdit(id));
  };

  const handleEditIconClick = () => {
    closePopper();
    dispatch(openPostEditDialog());
  };

  const handleTrashIconClick = useCallback(() => {
    closePopper();

    let postDeletionDialogData = {
      isOpen: true,
      title: 'delete this post?',
      content: 'Your post will be permanenty deleted and cannot be recovered.',
      choices: ['cancel', 'confirm'],
      confirmHandler: () => dispatch(deletePost()),
    };

    dispatch(setConfirmationDialog(postDeletionDialogData));
  }, []);

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleMoreIconClick}>
        <MoreVertIcon color="primary" />
      </IconButton>
      <Popper open={isPopperOpen} anchorEl={anchorRef.current} placement="bottom-end" transition disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={closePopper}>
                <MenuList>
                  <MenuItem onClick={handleEditIconClick}>
                    <EditIcon color="primary" />
                  </MenuItem>
                  <MenuItem onClick={handleTrashIconClick}>
                    <DeleteIcon color="secondary" />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
