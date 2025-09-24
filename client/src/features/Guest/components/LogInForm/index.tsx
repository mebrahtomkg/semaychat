import { MouseEventHandler, useState } from 'react';
import { useAccountActions } from '@/hooks';
import { Account } from '@/types';
import { checkEmail, checkPassword } from '../../utils';
import { FormLink, FormOptionLinker, FormTitle } from '../../styles';
import TextInput from '../TextInput';
import SubmitButton from '../SubmitButton';
import { post } from '@/api';

type LogInField = 'email' | 'password';

const LogInForm = () => {
  const { setAccount } = useAccountActions();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [shakeErrors, setShakeErrors] = useState(false);
  const [activeField, setActiveField] = useState<LogInField>('email');

  const handleEmailChange: MouseEventHandler<HTMLInputElement> = (event) => {
    setEmail((event.target as HTMLInputElement).value);
    setEmailError('');
    setActiveField('email');
    setShakeErrors(false);
  };

  const handlePasswordChange: MouseEventHandler<HTMLInputElement> = (event) => {
    setPassword((event.target as HTMLInputElement).value);
    setPasswordError('');
    setActiveField('password');
    setShakeErrors(false);
  };

  const doLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const emailError = checkEmail(email);
    const passwordError = checkPassword(password);

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      setShakeErrors(true);
    } else {
      try {
        const data = await post<Account>('/auth/login', {
          email: trimmedEmail,
          password: trimmedPassword,
        });
        setAccount(data);
      } catch (err) {
        setPasswordError(
          (err as Error).message || 'Unkown error happened while login!',
        );
        setShakeErrors(true);
      }
    }
  };

  return (
    <form action="login" method="POST">
      <FormTitle>LogIn</FormTitle>

      <TextInput
        label="Email"
        type="email"
        name="email"
        value={email}
        shouldFocus={activeField === 'email'}
        onChangeListener={handleEmailChange}
        onEnter={doLogin}
        error={emailError}
        shakeError={shakeErrors}
      />

      <TextInput
        label="Password"
        type="password"
        name="password"
        value={password}
        shouldFocus={activeField === 'password'}
        onChangeListener={handlePasswordChange}
        onEnter={doLogin}
        error={passwordError}
        shakeError={shakeErrors}
      />

      <SubmitButton value="LogIn" onClick={doLogin} />

      <FormOptionLinker>
        {`Don't have an account? `}
        <FormLink to="../signup">Sign Up</FormLink>
      </FormOptionLinker>
    </form>
  );
};

export default LogInForm;
