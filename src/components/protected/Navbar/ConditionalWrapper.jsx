import React, { useCallback, useState } from 'react';
import { Drawer, IconButton } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

const ConditionalWrapper = ({ innerWidth, children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = useCallback(() => setIsDrawerOpen((x) => !x), []);

  return innerWidth > 960 ? (
    children
  ) : (
    <>
      <IconButton onClick={toggleDrawer}>
        <Menu fontSize="large" color="secondary" />
      </IconButton>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        {React.cloneElement(children, { ...{ isMobile: true }, toggleDrawer })}
      </Drawer>
    </>
  );
};

export default ConditionalWrapper;
