import { CardHeader } from '@material-ui/core';

import { useSelector } from 'react-redux';
import { selectUserUsername } from '../../../../state/auth/selectors';
import { useCard } from '../../context';
import { UserCardAvatar, AltUserCardAvatar, CardTitle, MoreAction } from './components';
import useStyles from './styles';

export default function PostCardHeader({ location }) {
  const { id, username } = useCard();
  const classes = useStyles();

  const isUserCard = useSelector(selectUserUsername) === username;

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
