import { CardContent, Chip, Typography } from '@material-ui/core';
import { Link } from '../../../../../../../components';
import { buildExplorePath } from '../../../../../../../constants/routes';
import useStyles from './styles';

export default function CardTags({ tags }) {
  const classes = useStyles();
  return (
    <CardContent className={classes.cardTagsBox}>
      {tags.map((tag) => (
        <Chip
          color="secondary"
          size="small"
          label={`#${tag}`}
          clickable
          component={Link}
          to={buildExplorePath(tag)}
        />
      ))}

      {/* <Typography className={classes.cardTags} variant="body2">
        {tags.map((tag) => (
          <Link key={tag} to={buildExplorePath(tag)}>
            #{tag}{' '}
          </Link>
        ))}
      </Typography> */}
    </CardContent>
  );
}
