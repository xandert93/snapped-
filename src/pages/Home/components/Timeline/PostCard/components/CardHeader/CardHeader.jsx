import { CardHeader } from '@material-ui/core';
import { CardAvatar, CardTitle, MoreAction } from './components';
import useStyles from './styles';

export default function PostCardHeader({
  id,
  username,
  isUserCard,
  location,
  clickHandlers,
}) {
  const classes = useStyles();

  return (
    <CardHeader
      className={classes.cardHeader}
      avatar={<CardAvatar {...{ username }} />}
      title={<CardTitle {...{ username }} />}
      titleTypographyProps={{
        variant: 'body1',
        // className: classes.cardTitle,
      }}
      subheader={location}
      subheaderTypographyProps={{
        variant: 'subtitle2',
        // className: classes.cardSubheader,
      }}
      action={isUserCard && <MoreAction {...{ id, clickHandlers }} />}
    />
  );
}
