import useStyles from './styles';
import moment from 'moment';
import { CardContent, Typography } from '@material-ui/core';
import { Schedule as ClockIcon } from '@material-ui/icons';

export default function CardFooter({ createdAt }) {
  const classes = useStyles();

  return (
    <CardContent>
      <ClockIcon color="secondary" className={classes.clockIcon} />
      <Typography className={classes.clockText} variant="caption" component="span">
        {moment(createdAt.toDate()).fromNow()}
      </Typography>
    </CardContent>
  );
}
