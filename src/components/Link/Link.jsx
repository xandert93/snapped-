import React from 'react';
import { Link as MuiLink } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './styles';

export default function Link({ to, children }) {
  const classes = useStyles();
  return (
    <MuiLink component={RouterLink} to={to}>
      {children}
    </MuiLink>
  );
}
