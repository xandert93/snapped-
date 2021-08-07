import { useState } from 'react';
import useStyles from './styles';

import { Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, SwipeableDrawer } from '@material-ui/core';
import { Brightness4, ContactSupport, ExitToApp, Menu as MenuIcon, Settings } from '@material-ui/icons';
import { ThemeSwitch } from '../../ThemeSwitch';
import { setConfirmationDialog } from '../../../state/app/actions';
import { store } from '../../../state/index';
import { logoutDialogData } from '../logoutDialogData';

const drawerList = [
  {
    icon: <Brightness4 />,
    texts: [<ThemeSwitch />, ''],
  },
  {
    isButton: true,
    icon: <Settings color="primary" />,
    texts: ['settings', 'change shit'],
  },
  {
    isButton: true,
    icon: <ContactSupport />,
    texts: ['contact us', 'tissues for ur issues'],
  },
  {
    isButton: true,
    icon: <ExitToApp color="secondary" />,
    texts: ['logout', 'ruuuuuuude!'],
    clickHandler: () => store.dispatch(setConfirmationDialog(logoutDialogData)),
  },
];

export default function SideDrawer() {
  const classes = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      <IconButton onClick={openDrawer}>
        <MenuIcon color="secondary" />
      </IconButton>
      <SwipeableDrawer anchor="left" open={isDrawerOpen} onClose={closeDrawer} onOpen={openDrawer}>
        <List className={classes.drawerList}>
          {drawerList.map(({ isButton, icon, texts, clickHandler }) => (
            <>
              <ListItem button={isButton} onClick={clickHandler}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={texts[0]} secondary={texts[1]} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </SwipeableDrawer>
    </>
  );
}
