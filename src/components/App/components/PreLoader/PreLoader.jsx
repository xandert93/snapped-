import { Box, CircularProgress } from '@material-ui/core';
import useStyles from './styles';

//props will contain "children" & "to" and maybe "onClick"
export default function PreLoader(props) {
  const classes = useStyles();
  return (
    <Box className={classes.preLoaderBox}>
      <CircularProgress className={classes.preLoader} size="20vh" />
    </Box>
  );
}
