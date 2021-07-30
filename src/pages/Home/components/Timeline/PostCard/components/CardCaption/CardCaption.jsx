import { CardContent, Typography } from '@material-ui/core';
import useStyles from './styles';

export default function CardCaption({ caption }) {
  const classes = useStyles();
  return (
    <CardContent>
      <Typography className={classes.cardCaption} variant="body1">
        {caption}
      </Typography>
    </CardContent>
  );
}
