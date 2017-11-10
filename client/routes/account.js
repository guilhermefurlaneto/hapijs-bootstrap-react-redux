import ChangePassword from '../pages/account/Change-Password';
import Login from '../pages/account/Login';
import PasswordRecovery from '../pages/account/Password-Recovery';
import ResetPassword from '../pages/account/Reset-Password';
import SignUp from '../pages/account/Sign-Up';

export default [
    {
      id : 'account.change-password',
      path : '/change-password',
      exact : true,
      component : ChangePassword,
    },
    {
      id : 'account.login',
      path : '/login',
      exact : true,
      component : Login,
    },
    {
      id : 'account.password-recovery',
      path : '/password-recovery',
      exact : true,
      component : PasswordRecovery,
    },
    {
      id : 'account.sign-up',
      path : '/sign-up',
      exact : true,
      component : SignUp,
    },
    {
      id : 'account.reset-password',
      path : '/reset-password/:resetToken',
      exact : true,
      component : ResetPassword,
    },
];
