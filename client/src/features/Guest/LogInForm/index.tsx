import { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router';
import { useAccountActions, useAPI } from '@/hooks';
import { Account } from '@/types';
import { SubmitButton, TextInput } from '../components';
import { FormTitle } from '../styles';
import { checkEmail, checkPassword } from '../utils';

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

  const { post } = useAPI();

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
      const { success, data, message } = await post<Account>('/auth/login', {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (success) {
        setAccount(data);
      } else {
        setPasswordError(message || '');
        setShakeErrors(true);
        console.error(success);
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

      <div>
        {`Don't have an account? `}
        <Link to="../signup">Sign up</Link>
      </div>
    </form>
  );
};

export default LogInForm;
