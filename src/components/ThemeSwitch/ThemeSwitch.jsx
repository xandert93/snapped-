import { Box, Switch, IconButton } from '@material-ui/core';
import { Brightness4, NightsStay, WbSunny } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';

import { toggleDarkMode } from '../../state/app/actions';
import useStyles from './styles';

const ThemeSwitch = () => {
  const classes = useStyles();

  const isDarkMode = useSelector((state) => state.app.isDarkMode);
  const dispatch = useDispatch();

  return (
    <Switch checked={isDarkMode} onChange={() => dispatch(toggleDarkMode())} />
  );

  return (
    <Box>
      <IconButton onClick={toggleDarkMode}>
        <Brightness4 />
      </IconButton>
      <Switch checked={isDarkMode} onChange={toggleDarkMode} />
    </Box>
  );

  return <Switch checked={isDarkMode} onChange={toggleDarkMode} />;

  return (
    <>
      <IconButton>
        <WbSunny fontSize="small" />
      </IconButton>
      <Switch checked={isDarkMode} onChange={toggleDarkMode} />

      <IconButton>
        <NightsStay fontSize="small" />
      </IconButton>
    </>
  );
};

export default ThemeSwitch;
