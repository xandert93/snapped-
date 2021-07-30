import {
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from '@material-ui/core';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons';
import { useState } from 'react';
import { useRef } from 'react';

export default function CardAction({ clickHandlers, id }) {
  const anchorRef = useRef();

  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const closePopper = () => setIsPopperOpen(false);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={() => {
          setIsPopperOpen((x) => !x);
          clickHandlers.moreIcon(id);
        }}>
        <MoreVertIcon color="primary" />
      </IconButton>
      <Popper
        open={isPopperOpen}
        anchorEl={anchorRef.current}
        placement="bottom-end"
        transition
        disablePortal>
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={closePopper}>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      closePopper();
                      clickHandlers.editIcon();
                    }}>
                    <EditIcon color="primary" />
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      closePopper();
                      clickHandlers.trashIcon();
                    }}>
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
