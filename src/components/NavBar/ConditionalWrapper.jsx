import { useCallback, useState, cloneElement } from 'react';
import { Drawer, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const ConditionalWrapper = ({ isVPsm, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => setIsDrawerOpen((x) => !x), []);

  return !isVPsm ? (
    children
  ) : (
    <>
      <IconButton onClick={toggleDrawer}>
        <Menu fontSize="large" color="secondary" />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        {cloneElement(children, { isVPsm, toggleDrawer })}
      </Drawer>
    </>
  );
};

export default ConditionalWrapper;
