import { useSelector } from 'react-redux';
import { userDetailsSelector } from '../../../../state/selectors';
import AuthTextField from '../AuthTextField';

export default function Login() {
  const { email, password } = useSelector(userDetailsSelector);

  return (
    <>
      <AuthTextField
        type="email"
        name="email"
        label="Email address"
        value={email}
      />
      <AuthTextField
        type="password"
        name="password"
        label="Password"
        value={password}
      />
    </>
  );
}
