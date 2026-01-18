import {
  FormLink,
  FormLinkContainer,
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
      <FormTitle>Log In</FormTitle>

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

      <SubmitButton
        text="Log In"
        onClick={handleLogIn}
        isSubmitting={isPending}
      />

      <FormLinkContainer>
        <FormLink to="../signup">Create Account</FormLink>
      </FormLinkContainer>
    </FormStyled>
  );
};

export default LogInForm;
