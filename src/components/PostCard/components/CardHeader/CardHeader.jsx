import { CardHeader } from '@material-ui/core';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { userUsernameSelector } from '../../../../state/auth/selectors';
import { CardContext } from '../../PostCard';
import { UserCardAvatar, AltUserCardAvatar, CardTitle, MoreAction } from './components';
import useStyles from './styles';

export default function PostCardHeader({ location }) {
  const { id, username } = useContext(CardContext);
  const classes = useStyles();

  const isUserCard = useSelector(userUsernameSelector) === username;

  return (
    <CardHeader
      className={classes.cardHeader}
      avatar={isUserCard ? <UserCardAvatar /> : <AltUserCardAvatar />}
      title={<CardTitle username={username} />}
      titleTypographyProps={{
        variant: 'body1',
        // className: classes.cardTitle,
      }}
      subheader={location}
      subheaderTypographyProps={{
        variant: 'subtitle2',
        // className: classes.cardSubheader,
      }}
      action={isUserCard && <MoreAction id={id} />}
    />
  );
}
