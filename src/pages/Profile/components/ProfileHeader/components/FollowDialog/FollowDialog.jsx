import { AppBar, Box, Dialog, DialogContent, DialogTitle, Slide, Tab, Tabs } from '@material-ui/core';
import { Lock, Publish } from '@material-ui/icons';
import _ from 'lodash';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { buildProfilePath } from '../../../../../../constants/routes';
import { Link, FollowButton } from '../../../../../../components';
import useStyles from './styles';
import { useEffect } from 'react';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const idxLookup = {
  following: 0,
  followers: 1,
};

export default function FollowDialog({
  followers,
  following,
  selectedTab,
  setSelectedTab,
  handleTabChange,
  parentURL,
}) {
  const classes = useStyles();

  const { dialogName } = useParams();
  const isMatched = ['followers', 'following'].includes(dialogName);
  const { push } = useHistory();

  useEffect(() => isMatched && setSelectedTab(idxLookup[dialogName]), []);

  let followData = selectedTab ? followers : following;

  const lookup = useSelector((state) => state.lookups.followUsers);

  return (
    <Dialog open={isMatched} TransitionComponent={Transition} onClose={() => push(parentURL)}>
      <AppBar component="div" position="static" className={classes.appBar}>
        <Tabs
          textColor="secondary"
          indicatorColor="primary"
          variant="fullWidth"
          value={selectedTab}
          onChange={handleTabChange}>
          <Tab icon={<Publish />} disabled={false} />
          <Tab icon={<Lock />} disabled={false} />
        </Tabs>
      </AppBar>

      {lookup && (
        <DialogContent>
          <DialogTitle>{_.capitalize(dialogName)}</DialogTitle>
          {followData.map((username) => (
            <Box key={username}>
              <Link to={buildProfilePath(username)}>{username}</Link>
              <FollowButton altUser={lookup[username]} />
            </Box>
          ))}
        </DialogContent>
      )}
    </Dialog>
  );
}
