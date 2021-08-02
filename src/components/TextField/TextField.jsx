import { TextField as MuiTextField, useMediaQuery } from '@material-ui/core';
import { checkIsVPxs } from '../../styles/mqSelectors';

//props will contain all the usual MUI TextField props
export default function TextField(props) {
  const isVPxs = useMediaQuery(checkIsVPxs);

  // const marginSize = isVPxs ? 'dense' : 'none';

  return <MuiTextField margin={'none'} {...props} />;
}
