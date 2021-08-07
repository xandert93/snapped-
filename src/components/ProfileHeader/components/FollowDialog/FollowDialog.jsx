import { AppBar, Box, Dialog, DialogContent, Slide, Tab, Tabs } from '@material-ui/core';
import { Lock, Publish } from '@material-ui/icons';
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { buildProfilePath } from '../../../../constants/routes';
import { FollowButton } from '../../../FollowButton';
import { Link } from '../../../Link';
import useStyles from './styles';

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FollowDialog({
  isDialogOpen,
  followers,
  following,
  setIsDialogOpen,
  selectedTab,
  handleTabChange,
}) {
  const classes = useStyles();

  const lookup = useSelector((state) => state.lookups.followUsers);

  return (
    <Dialog open={isDialogOpen} TransitionComponent={Transition} onClose={() => setIsDialogOpen(false)}>
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
          {selectedTab === 0 &&
            //  <DialogTitle>Followers</DialogTitle>

            followers.map((username) => (
              <Box key={username}>
                <Link to={buildProfilePath(username)}>{username}</Link>
                <FollowButton altUser={lookup[username]} />
              </Box>
            ))}

          {selectedTab === 1 &&
            // {<DialogTitle>Following</DialogTitle>
            following.map((username) => (
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
