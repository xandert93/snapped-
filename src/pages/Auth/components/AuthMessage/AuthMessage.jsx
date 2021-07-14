import { Typography } from '@material-ui/core';

export default function AuthMessage({ isSuccess, children }) {
  return (
    <Typography color={`${isSuccess ? 'primary' : 'error'}`}>
      {children}
    </Typography>
  );
}
