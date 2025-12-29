import { InputEventHandler, useRef, useState } from 'react';
import { useAccountActions } from '@/hooks';
import { Account } from '@/types';
import { checkEmail, checkPassword } from '../utils';
import {
  ActionButton,
  ButtonsContainer,
  FormLink,
  FormStyled,
  FormTitle,
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
    const emailError = checkEmail(email);
    if (emailError) {
      setEmailError(emailError);
      emailInputRef.current?.focusInput();
      emailInputRef.current?.animateInfo();
      return;
    }

    const passwordError = checkPassword(password);
    if (passwordError) {
      setPasswordError(passwordError);
      passwordInputRef.current?.focusInput();
      passwordInputRef.current?.animateInfo();
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

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
        <FormLink to="../signup">Sign Up</FormLink>

        <ActionButton type="button" onClick={doLogin}>
          LogIn
        </ActionButton>
      </ButtonsContainer>
    </FormStyled>
  );
};

export default LogInForm;
