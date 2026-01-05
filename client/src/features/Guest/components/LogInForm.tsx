import { InputEventHandler, useRef, useState } from 'react';
import { useAccountActions } from '@/hooks';
import { Account } from '@/types';
import { checkEmail, checkPassword } from '../utils';
import {
  ButtonsContainer,
  FormLink,
  FormStyled,
  FormTitle,
  PrimaryButton,
} from '../styles';
import { post } from '@/api';
import TextInput, { TextInputImperativeHandle } from '@/components/TextInput';

const LogInForm = () => {
  const { setAccount } = useAccountActions();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const emailInputRef = useRef<TextInputImperativeHandle | null>(null);

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const passwordInputRef = useRef<TextInputImperativeHandle | null>(null);

  const handleEmailChange: InputEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.currentTarget.value);
    setEmailError('');
  };

  const handlePasswordChange: InputEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
    setPasswordError('');
  };

  const doLogin = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const emailError = checkEmail(trimmedEmail);
    const passwordError = checkPassword(trimmedPassword);

    if (emailError || passwordError) {
      if (emailError) {
        setEmailError(emailError);
        emailInputRef.current?.animateInfo();
      }

      if (passwordError) {
        setPasswordError(passwordError);
        passwordInputRef.current?.animateInfo();
      }

      if (emailError) {
        emailInputRef.current?.focusInput();
      } else {
        passwordInputRef.current?.focusInput();
      }

      return;
    }

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
      passwordInputRef.current?.animateInfo();
    }
  };

  return (
    <FormStyled>
      <FormTitle>LogIn</FormTitle>

      <TextInput
        id="id-email-input"
        label="Email"
        type="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        ref={emailInputRef}
        onEnter={doLogin}
        errorMessage={emailError}
      />

      <TextInput
        id="id-password-input"
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        ref={passwordInputRef}
        onEnter={doLogin}
        errorMessage={passwordError}
      />

      <ButtonsContainer>
        <FormLink to="../signup">Create Account</FormLink>

        <PrimaryButton type="button" onClick={doLogin}>
          LogIn
        </PrimaryButton>
      </ButtonsContainer>
    </FormStyled>
  );
};

export default LogInForm;
