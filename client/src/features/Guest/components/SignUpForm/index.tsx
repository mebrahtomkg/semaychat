import TextInput from '@/components/TextInput';
import {
  ButtonsContainer,
  FormLink,
  FormStyled,
  FormTitle,
  PrimaryButton,
} from '../../styles';
import BackButton from '../BackButton';
import useSignUp from './useSignUp';
import SubmitButton from '../SubmitButton';

const SignUpForm = () => {
  const {
    step,

    firstNameInput,
    lastNameInput,
    emailInput,

    handleNextClick,

    passwordInput,
    cfmPasswordInput,

    handleBackClick,
    handleSignup,

    isPending,
  } = useSignUp();

  return (
    <FormStyled>
      <FormTitle>Create Account</FormTitle>

      {step === 'first' && (
        <>
          <TextInput
            key="key-first-name"
            id="id-first-name"
            label="First name"
            type="text"
            {...firstNameInput.props}
            onEnter={handleNextClick}
          />
          <TextInput
            key="key-last-name"
            id="id-last-name"
            label="Last name (optional)"
            type="text"
            {...lastNameInput.props}
            onEnter={handleNextClick}
          />
          <TextInput
            key="key-email"
            id="id-email"
            label="Email address"
            type="email"
            {...emailInput.props}
            onEnter={handleNextClick}
          />

          <ButtonsContainer>
            <FormLink to="../login">Log In</FormLink>

            <SubmitButton
              text="Next"
              onClick={handleNextClick}
              isSubmitting={false}
            />
          </ButtonsContainer>
        </>
      )}

      {step === 'second' && (
        <>
          <TextInput
            key="key-password"
            id="id-password"
            label="Password"
            type="password"
            {...passwordInput.props}
            onEnter={handleSignup}
          />
          <TextInput
            key="key-confirm-password"
            id="id-confirm-password"
            label="Confirm password"
            type="password"
            {...cfmPasswordInput.props}
            onEnter={handleSignup}
          />

          <ButtonsContainer>
            <BackButton onClick={handleBackClick} />

            <SubmitButton
              text="Sign Up"
              onClick={handleSignup}
              isSubmitting={isPending}
            />
          </ButtonsContainer>
        </>
      )}
    </FormStyled>
  );
};

export default SignUpForm;
