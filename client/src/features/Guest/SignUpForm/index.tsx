import { MouseEventHandler, useState } from 'react';
import { Link } from 'react-router';
import { useAccountActions, useAPI } from '@/hooks';
import { Account } from '@/types';
import { SubmitButton, TextInput } from '../components';
import { FormTitle } from '../styles';
import {
  checkConfirmPassword,
  checkEmail,
  checkName,
  checkPassword,
} from '../utils';

type SignUpField = 'name' | 'email' | 'password' | 'confirmPassword';

const SignUpForm = () => {
  const { setAccount } = useAccountActions();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [cfmPassword, setCfmPassword] = useState('');
  const [cfmPasswordError, setCfmPasswordError] = useState('');

  const [shakeErrors, setShakeErrors] = useState(false);
  const [activeField, setActiveField] = useState<SignUpField>('email');

  const handleNameChange: MouseEventHandler<HTMLInputElement> = (event) => {
    setName((event.target as HTMLInputElement).value);
    setNameError('');
    setActiveField('name');
    setShakeErrors(false);
  };

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

  const handleCfmPasswordChange: MouseEventHandler<HTMLInputElement> = (e) => {
    setCfmPassword((e.target as HTMLInputElement).value);
    setCfmPasswordError('');
    setActiveField('confirmPassword');
    setShakeErrors(false);
  };

  const { post } = useAPI();

  const onSubmitHandler = async () => {
    const _name = name.trim();
    const _email = email.trim();
    const _password = password.trim();
    const _cfmPassword = cfmPassword.trim();

    const _nameError = checkName(_name);
    const _emailError = checkEmail(_email);
    const _passwordError = checkPassword(_password);
    let _cfmPasswordError = checkConfirmPassword(_cfmPassword);

    if (!_cfmPasswordError && _cfmPassword !== _password) {
      _cfmPasswordError = 'Passwords do not match.';
    }

    if (_nameError || _emailError || _passwordError || _cfmPasswordError) {
      setNameError(_nameError);
      setEmailError(_emailError);
      setPasswordError(_passwordError);
      setCfmPasswordError(_cfmPasswordError);
      setShakeErrors(true);
    } else {
      const { success, data, message } = await post<Account>('/auth/signup', {
        firstName: _name,
        email: _email,
        password: _password,
      });
      if (success && data) {
        setAccount(data);
      } else {
        setCfmPasswordError(message || '');
        setShakeErrors(true);
        console.error(message);
      }
    }
  };

  return (
    <form action="signup" method="POST">
      <FormTitle>Join Now</FormTitle>

      <TextInput
        label="Name"
        name="name"
        value={name}
        shouldFocus={activeField === 'name'}
        onChangeListener={handleNameChange}
        onEnter={onSubmitHandler}
        error={nameError}
        shakeError={shakeErrors}
      />

      <TextInput
        label="Email"
        type="email"
        name="email"
        value={email}
        shouldFocus={activeField === 'email'}
        onChangeListener={handleEmailChange}
        onEnter={onSubmitHandler}
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
        onEnter={onSubmitHandler}
        error={passwordError}
        shakeError={shakeErrors}
      />

      <TextInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={cfmPassword}
        shouldFocus={activeField === 'confirmPassword'}
        onChangeListener={handleCfmPasswordChange}
        onEnter={onSubmitHandler}
        error={cfmPasswordError}
        shakeError={shakeErrors}
      />

      <SubmitButton value="Sign Up" onClick={onSubmitHandler} />

      <div>
        {`Already have an account? `}
        <Link to="../login">Log in</Link>
      </div>
    </form>
  );
};

export default SignUpForm;
