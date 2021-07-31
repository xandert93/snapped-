import { CardContent, Chip } from '@material-ui/core';
import { buildExplorePath } from '../../../../constants/routes';
import { Link } from '../../../Link';
import useStyles from './styles';

export default function CardTags({ tags }) {
  const classes = useStyles();
  return (
    <CardContent className={classes.cardTagsBox}>
      {tags.map((tag) => (
        <Chip color="secondary" size="small" label={`#${tag}`} clickable component={Link} to={buildExplorePath(tag)} />
      ))}
    </CardContent>
  );
}
