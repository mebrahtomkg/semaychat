import { MouseEventHandler, useState } from 'react';
import { useAccountActions } from '@/hooks';
import { Account } from '@/types';
import {
  checkConfirmPassword,
  checkEmail,
  checkName,
  checkPassword,
} from '../../utils';
import { FormLink, FormOptionLinker, FormTitle } from '../../styles';
import TextInput from '../TextInput';
import SubmitButton from '../SubmitButton';
import { post } from '@/api';

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
      try {
        const data = await post<Account>('/auth/signup', {
          firstName: _name,
          email: _email,
          password: _password,
        });
        setAccount(data);
      } catch (err) {
        setCfmPasswordError(
          (err as Error).message || 'Unkown error happened while signup!',
        );
        setShakeErrors(true);
      }
    }
  };

  return (
    <form action="signup" method="POST">
      <FormTitle>Join Now</FormTitle>

      <TextInput
        label="Name"
        type="text"
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

      <FormOptionLinker>
        {`Already have an account? `}
        <FormLink to="../login">Log In</FormLink>
      </FormOptionLinker>
    </form>
  );
};

export default SignUpForm;
