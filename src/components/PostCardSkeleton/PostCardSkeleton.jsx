import { Card, CardContent, CardHeader } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import useStyles from './styles';

export default function PostCardSkeleton() {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={<Skeleton animation="wave" variant="circle" width={56} height={56} />}
        title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton animation="wave" variant="rect" className={classes.media} />
      <CardContent>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
    </Card>
  );
}
