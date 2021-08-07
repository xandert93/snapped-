import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useStyles from './styles';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { Lock, PhotoLibrary, Public } from '@material-ui/icons';

const idxLookup = {
  public: 0,
  private: 1,
  all: 2,
};
const tabNameLookup = {
  0: 'public',
  1: 'private',
  2: 'all',
};

export default function ImageTabs() {
  const classes = useStyles();
  const { username, tabName } = useParams();
  const { push } = useHistory();

  const [selectedTabIdx, setSelectedTabIdx] = useState(idxLookup[tabName]);

  const tabChangeHandler = (e, tabIdx) => {
    push(`/p/${username}/${tabNameLookup[tabIdx]}`);
    setSelectedTabIdx(tabIdx);
  };

  return (
    <AppBar component="div" position="static" className={classes.appBar}>
      <Tabs
        textColor="primary"
        indicatorColor="secondary"
        variant="fullWidth"
        value={selectedTabIdx}
        onChange={tabChangeHandler}>
        <Tab icon={<Public />} disabled={false} />
        <Tab icon={<Lock />} disabled={false} />
        <Tab icon={<PhotoLibrary />} />
      </Tabs>
    </AppBar>
  );
}
