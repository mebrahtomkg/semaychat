import { useState } from 'react';
import NameInput, { checkName } from './NameInput';
import EmailInput, { checkEmail } from './EmailInput';
import PasswordInput, { checkPassword } from './PasswordInput';
import ConfirmPasswordInput, {
  checkConfirmPassword,
} from './ConfirmPasswordInput';
import { Link } from 'react-router';
import { ButtonPrimary, FormTitle } from '../LogInForm';
import { InputGroup } from '../TextInput';
import { useAPI, useAppDispatch } from '../../../hooks';
import { accountFetched } from '../../Settings/slices/accountSlice';
import { Account } from '../../../types';

export default function SignUpForm() {
  const [state, setState] = useState({
    name: '',
    nameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    shakeErrors: false,
    activeField: 'name',
  });

  const onChangeListener = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      [`${name}Error`]: null,
      activeField: name,
      shakeErrors: false,
    }));
  };

  const { post } = useAPI();

  const dispatch = useAppDispatch();

  const onSubmitHandler = async () => {
    const name = state.name.trim();
    const email = state.email.trim();
    const password = state.password.trim();
    const confirmPassword = state.confirmPassword.trim();
    const nameError = checkName(name);
    const emailError = checkEmail(email);
    const passwordError = checkPassword(password);
    let confirmPasswordError = checkConfirmPassword(confirmPassword);
    if (!confirmPasswordError && confirmPassword !== password) {
      confirmPasswordError = 'Passwords do not match.';
    }
    if (nameError || emailError || passwordError || confirmPasswordError) {
      setState((prevState) => ({
        ...prevState,
        nameError,
        emailError,
        passwordError,
        confirmPasswordError,
        shakeErrors: true,
      }));
    } else {
      const { success, data, message } = await post<Account>('/auth/signup', {
        firstName: name,
        email,
        password,
      });
      if (success && data) {
        dispatch(accountFetched(data));
      } else {
        setState((prevState) => ({
          ...prevState,
          confirmPasswordError: message || '',
          shakeErrors: true,
        }));
        console.error(message);
      }
    }
  };

  const onEnter = () => onSubmitHandler();

  const shakeError = state.shakeErrors;

  return (
    <form action="signup" method="POST">
      <FormTitle>Join Now</FormTitle>
      <NameInput
        {...{
          value: state.name,
          shouldFocus: state.activeField === 'name',
          onChangeListener,
          onEnter,
          error: state.nameError,
          shakeError,
        }}
      />
      <EmailInput
        {...{
          value: state.email,
          shouldFocus: state.activeField === 'email',
          onChangeListener,
          onEnter,
          error: state.emailError,
          shakeError,
        }}
      />
      <PasswordInput
        {...{
          value: state.password,
          shouldFocus: state.activeField === 'password',
          onChangeListener,
          onEnter,
          error: state.passwordError,
          shakeError,
        }}
      />
      <ConfirmPasswordInput
        {...{
          value: state.confirmPassword,
          shouldFocus: state.activeField === 'confirmPassword',
          onChangeListener,
          onEnter,
          error: state.confirmPasswordError,
          shakeError,
        }}
      />
      <SubmitButton onSubmitHandler={onSubmitHandler} />
      <div>
        {`Already have an account? `}
        <Link to="../login">Log in</Link>
      </div>
    </form>
  );
}

function SubmitButton({ onSubmitHandler }) {
  const onClickHandler = (event) => {
    event.preventDefault();
    onSubmitHandler();
  };
  return (
    <InputGroup>
      <ButtonPrimary type="submit" value="Sign Up" onClick={onClickHandler} />
    </InputGroup>
  );
}
