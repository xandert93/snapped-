import { Link as MuiLink } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './styles';

//props will contain "children" & "to" and maybe "onClick"
export default function Link(props) {
  const classes = useStyles();
  return (
    <MuiLink className={classes.link} component={RouterLink} {...props}>
      {props.children}
    </MuiLink>
  );
}
