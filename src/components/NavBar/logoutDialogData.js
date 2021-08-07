import { fbLogout } from '../../services/firebase/auth';

export const logoutDialogData = {
  isOpen: true,
  title: 'logout?',
  content: 'You will not be missed.',
  choices: ['hola!', 'adios'],
  confirmHandler: fbLogout,
};
