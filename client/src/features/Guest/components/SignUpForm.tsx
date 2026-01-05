import {
  ButtonsContainer,
  FormLink,
  FormStyled,
  FormTitle,
  PrimaryButton,
} from '../styles';
import TextInput from '@/components/TextInput';
import BackButton from './BackButton';
import useSignUp from './useSignUp';

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
  } = useSignUp();

  return (
    <FormStyled>
      <FormTitle>Create Account</FormTitle>

      {step === 'first' && (
        <>
          <TextInput
            id="id-first-name"
            label="First name"
            type="text"
            name="firstName"
            value={firstNameInput.value}
            errorMessage={firstNameInput.error}
            onChange={firstNameInput.handleChange}
            ref={firstNameInput.inputRef}
            onEnter={handleNextClick}
          />
          <TextInput
            id="id-last-name"
            label="Last name (optional)"
            type="text"
            name="lastName"
            value={lastNameInput.value}
            errorMessage={lastNameInput.error}
            onChange={lastNameInput.handleChange}
            ref={lastNameInput.inputRef}
            onEnter={handleNextClick}
          />
          <TextInput
            id="id-email"
            label="Email address"
            type="email"
            name="email"
            value={emailInput.value}
            errorMessage={emailInput.error}
            onChange={emailInput.handleChange}
            ref={emailInput.inputRef}
            onEnter={handleNextClick}
          />

          <ButtonsContainer>
            <FormLink to="../login">Log In</FormLink>
            <PrimaryButton type="button" onClick={handleNextClick}>
              Next
            </PrimaryButton>
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
            value={passwordInput.value}
            errorMessage={passwordInput.error}
            onChange={passwordInput.handleChange}
            ref={passwordInput.inputRef}
            onEnter={handleSignup}
          />
          <TextInput
            id="id-confirm-password"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={cfmPasswordInput.value}
            errorMessage={cfmPasswordInput.error}
            onChange={cfmPasswordInput.handleChange}
            ref={cfmPasswordInput.inputRef}
            onEnter={handleSignup}
          />

          <ButtonsContainer>
            <BackButton onClick={handleBackClick} />

            <PrimaryButton type="button" onClick={handleSignup}>
              Sign Up
            </PrimaryButton>
          </ButtonsContainer>
        </>
      )}
    </FormStyled>
  );
};

export default SignUpForm;
