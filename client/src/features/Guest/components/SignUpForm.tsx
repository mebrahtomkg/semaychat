import { InputEventHandler, useRef, useState } from 'react';
import { useAccountActions } from '@/hooks';
import { Account } from '@/types';
import {
  checkConfirmPassword,
  checkEmail,
  checkName,
  checkPassword,
} from '../utils';
import {
  ActionButton,
  ButtonsContainer,
  FormLink,
  FormStyled,
  FormTitle,
} from '../styles';
import { post } from '@/api';
import TextInput, { TextInputImperativeHandle } from '@/components/TextInput';
import BackButton from './BackButton';

type SignUpStep = 'first' | 'second';

const SignUpForm = () => {
  const [step, setStep] = useState<SignUpStep>('first');
  const { setAccount } = useAccountActions();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailInputRef = useRef<TextInputImperativeHandle | null>(null);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const nameInputRef = useRef<TextInputImperativeHandle | null>(null);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordInputRef = useRef<TextInputImperativeHandle | null>(null);

  const [cfmPassword, setCfmPassword] = useState('');
  const [cfmPasswordError, setCfmPasswordError] = useState('');
  const cfmPasswordInputRef = useRef<TextInputImperativeHandle | null>(null);

  const handleNameChange: InputEventHandler<HTMLInputElement> = (e) => {
    setName(e.currentTarget.value);
    setNameError('');
  };

  const handleEmailChange: InputEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.currentTarget.value);
    setEmailError('');
  };

  const handleNextClick = async () => {
    const _name = name.trim();
    const _email = email.trim();

    const _nameError = checkName(_name);
    const _emailError = checkEmail(_email);

    if (_nameError || _emailError) {
      if (_nameError) {
        setNameError(_nameError);
        nameInputRef.current?.focusInput();
        nameInputRef.current?.animateInfo();
      }
      if (_emailError) {
        setEmailError(_emailError);
        emailInputRef.current?.animateInfo();
        // if name had errors it would be the focused input already
        if (!_nameError) {
          emailInputRef.current?.focusInput();
        }
      }
    } else {
      setStep('second');
    }
  };

  const handleBackClick = () => setStep('first');

  const handlePasswordChange: InputEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
    setPasswordError('');
  };

  const handleCfmPasswordChange: InputEventHandler<HTMLInputElement> = (e) => {
    setCfmPassword(e.currentTarget.value);
    setCfmPasswordError('');
  };

  const handleSignup = async () => {
    const _password = password.trim();
    const _cfmPassword = cfmPassword.trim();

    const _passwordError = checkPassword(_password);
    let _cfmPasswordError = checkConfirmPassword(_cfmPassword);

    if (!_cfmPasswordError && _cfmPassword !== _password) {
      _cfmPasswordError = 'Passwords do not match.';
    }

    if (_passwordError || _cfmPasswordError) {
      if (_passwordError) {
        setPasswordError(_passwordError);
        passwordInputRef.current?.focusInput();
        passwordInputRef.current?.animateInfo();
      }
      if (_cfmPasswordError) {
        setCfmPasswordError(_cfmPasswordError);
        cfmPasswordInputRef.current?.animateInfo();
        // if password had errors it would be the focused input already
        if (!_passwordError) {
          cfmPasswordInputRef.current?.focusInput();
        }
      }
    } else {
      try {
        const data = await post<Account>('/auth/signup', {
          firstName: name.trim(),
          email: email.trim(),
          password: _password,
        });
        setAccount(data);
      } catch (err) {
        setCfmPasswordError(
          (err as Error).message || 'Unkown error happened while signup!',
        );
        cfmPasswordInputRef.current?.animateInfo();
      }
    }
  };

  return (
    <FormStyled>
      <FormTitle>Create Account</FormTitle>

      {step === 'first' && (
        <>
          <TextInput
            id="id-name"
            label="Name"
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
            ref={nameInputRef}
            onEnter={handleNextClick}
            errorMessage={nameError}
          />
          <TextInput
            id="id-email"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            ref={emailInputRef}
            onEnter={handleNextClick}
            errorMessage={emailError}
          />

          <ButtonsContainer>
            <FormLink to="../login">Log In</FormLink>
            <ActionButton type="button" onClick={handleNextClick}>
              Next
            </ActionButton>
          </ButtonsContainer>
        </>
      )}

      {step === 'second' && (
        <>
          <TextInput
            id="id-password"
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            ref={passwordInputRef}
            onEnter={handleSignup}
            errorMessage={passwordError}
          />
          <TextInput
            id="id-confirm-password"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={cfmPassword}
            onChange={handleCfmPasswordChange}
            ref={cfmPasswordInputRef}
            onEnter={handleSignup}
            errorMessage={cfmPasswordError}
          />

          <ButtonsContainer>
            <BackButton onClick={handleBackClick} />

            <ActionButton type="button" onClick={handleSignup}>
              Sign Up
            </ActionButton>
          </ButtonsContainer>
        </>
      )}
    </FormStyled>
  );
};

export default SignUpForm;
