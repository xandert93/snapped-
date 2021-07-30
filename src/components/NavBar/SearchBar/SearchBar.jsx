import { useEffect, useState } from 'react';
import { Box, InputBase } from '@material-ui/core';

import useStyles from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import { buildSearchPath, ROUTES } from '../../../constants/routes';

export default function SearchBar() {
  const classes = useStyles();
  const { pathname } = useLocation();
  const { push } = useHistory();

  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    searchTerm.trim() && push(buildSearchPath(searchTerm));
  };

  useEffect(() => {
    pathname !== ROUTES.SEARCH && setSearchTerm('');
  }, [pathname]);

  return (
    <Box className={classes.searchBox}>
      <form onSubmit={handleSubmit}>
        <InputBase
          classes={{
            root: classes.inputBaseRoot,
            input: classes.input,
          }}
          placeholder={`🔍 Search users & topics!`}
          name="search_query"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
        />
      </form>
    </Box>
  );
}
