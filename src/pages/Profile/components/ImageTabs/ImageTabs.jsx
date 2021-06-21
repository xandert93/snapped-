import { useContext } from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Lock, PhotoLibrary, Public } from '@material-ui/icons';
import useStyles from './styles';
import { profileContext } from '../../../../contexts/5.profile/profileContext';

const ImageTabs = () => {
  const classes = useStyles();

  const { selectedTab, tabChangeHandler } = useContext(profileContext);

  return (
    <AppBar position="static" color="inherit" className={classes.appBar}>
      <Tabs
        textColor="secondary"
        variant="fullWidth"
        value={selectedTab}
        onChange={tabChangeHandler}>
        <Tab icon={<Public />} disabled={false} />
        <Tab icon={<Lock />} disabled={false} />
        <Tab icon={<PhotoLibrary />} />
      </Tabs>
    </AppBar>
  );
};

export default ImageTabs;
