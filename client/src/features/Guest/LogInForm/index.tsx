import { useState } from 'react';
import EmailInput, { checkEmail } from './EmailInput';
import PasswordInput, { checkPassword } from './PasswordInput';
import { Link } from 'react-router';
import { InputGroup } from '../TextInput';
import styled from 'styled-components';
import { useAPI, useAppDispatch } from '../../../hooks';
import { accountUpdated } from '../../Settings/slices/accountSlice';
import { Account } from '../../../types';

export const FormTitle = styled.h2`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  color: #26a7c4;
`;

export default function LogInForm() {
  const [state, setState] = useState({
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    shakeErrors: false,
    activeField: 'email'
  });

  const onChangeListener = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      [`${name}Error`]: null,
      activeField: name,
      shakeErrors: false
    }));
  };

  const { post } = useAPI();

  const dispatch = useAppDispatch();

  const doLogin = async () => {
    const email = state.email.trim();
    const password = state.password.trim();
    const emailError = checkEmail(email);
    const passwordError = checkPassword(password);
    if (emailError || passwordError) {
      setState((prevState) => ({
        ...prevState,
        emailError,
        passwordError,
        shakeErrors: true
      }));
    } else {
      const { success, data, message } = await post<Account>('/auth/login', {
        email,
        password
      });

      if (success) {
        dispatch(accountUpdated(data || null));
      } else {
        setState((prevState) => ({
          ...prevState,
          passwordError: message || '',
          shakeErrors: true
        }));
        console.error(success);
      }
    }
  };

  const onEnter = () => doLogin();

  const shakeError = state.shakeErrors;

  return (
    <form action="login" method="POST">
      <FormTitle>LogIn</FormTitle>
      <EmailInput
        {...{
          value: state.email,
          shouldFocus: state.activeField === 'email',
          onChangeListener,
          onEnter,
          error: state.emailError,
          shakeError
        }}
      />
      <PasswordInput
        {...{
          value: state.password,
          shouldFocus: state.activeField === 'password',
          onChangeListener,
          onEnter,
          error: state.passwordError,
          shakeError
        }}
      />
      <LogInButton onClickHandler={doLogin} />
      <div>
        {`Don't have an account? `}
        <Link to="../signup">Sign up</Link>
      </div>
    </form>
  );
}

export const ButtonPrimary = styled.input`
  padding: 0.5rem 1.7rem;
  cursor: pointer;
  box-shadow: none;
  outline-style: none;
  border: 1px solid #2f8396;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  color: #b1b1b1;
  background: transparent;
  &:hover {
    border-color: #06e2ff;
  }
`;

function LogInButton({ onClickHandler: onClickHandlerImpl }) {
  const onClickHandler = (event) => {
    event.preventDefault();
    onClickHandlerImpl();
  };
  return (
    <InputGroup>
      <ButtonPrimary type="submit" value="LogIn" onClick={onClickHandler} />
    </InputGroup>
  );
}
