import React, { useCallback, useState } from 'react';
import { Drawer, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const ConditionalWrapper = ({ isMobile, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => setIsDrawerOpen((x) => !x), []);

  return !isMobile ? (
    children
  ) : (
    <>
      <IconButton onClick={toggleDrawer}>
        <Menu fontSize="large" color="secondary" />
      </IconButton>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        {React.cloneElement(children, { isMobile, toggleDrawer })}
      </Drawer>
    </>
  );
};

export default ConditionalWrapper;
