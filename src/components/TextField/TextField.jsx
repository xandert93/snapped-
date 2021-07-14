import { TextField as MuiTextField, useMediaQuery } from '@material-ui/core';

//props will contain all the usual MUI TextField props
export default function TextField(props) {
  const isVPxs = useMediaQuery(({ breakpoints }) => breakpoints.only('xs'));

  const marginSize = isVPxs ? 'dense' : 'none';

  return <MuiTextField margin={marginSize} {...props} />;
}
