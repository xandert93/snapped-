import { useSelector } from 'react-redux';
import { userDetailsSelector } from '../../../../state/authForms/selectors';
import AuthTextField from '../AuthTextField';

export default function ResetPassword() {
  const { email } = useSelector(userDetailsSelector);

  return (
    <AuthTextField
      type="email"
      name="email"
      label="Email address"
      value={email}
    />
  );
}
