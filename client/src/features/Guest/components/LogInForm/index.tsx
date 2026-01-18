import {
  ButtonsContainer,
  FormLink,
  FormStyled,
  FormTitle,
} from '../../styles';
import TextInput from '@/components/TextInput';
import useLogIn from './useLogIn';
import SubmitButton from '../SubmitButton';

const LogInForm = () => {
  const { emailInput, passwordInput, handleLogIn, isPending } = useLogIn();

  return (
    <FormStyled>
      <FormTitle>LogIn</FormTitle>

      <TextInput
        key="key-email"
        id="id-email"
        label="Email"
        type="email"
        {...emailInput.props}
        onEnter={handleLogIn}
      />

      <TextInput
        key="key-password"
        id="id-password"
        label="Password"
        type="password"
        {...passwordInput.props}
        onEnter={handleLogIn}
      />

      <ButtonsContainer>
        <FormLink to="../signup">Create Account</FormLink>

        <SubmitButton
          text="Login"
          onClick={handleLogIn}
          isSubmitting={isPending}
        />
      </ButtonsContainer>
    </FormStyled>
  );
};

export default LogInForm;
