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

    firstNameInputRef,
    firstNameInfo,
    handleFirstNameChange,

    lastNameInputRef,
    lastNameInfo,
    handleLastNameChange,

    emailInputRef,
    emailInfo,
    handleEmailChange,

    handleNextClick,

    passwordInputRef,
    passwordInfo,
    handlePasswordChange,

    cfmPasswordInputRef,
    cfmPasswordInfo,
    handleCfmPasswordChange,

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
            value={firstNameInfo.value}
            errorMessage={firstNameInfo.error}
            onChange={handleFirstNameChange}
            ref={firstNameInputRef}
            onEnter={handleNextClick}
          />
          <TextInput
            id="id-last-name"
            label="Last name (optional)"
            type="text"
            name="lastName"
            value={lastNameInfo.value}
            errorMessage={lastNameInfo.error}
            onChange={handleLastNameChange}
            ref={lastNameInputRef}
            onEnter={handleNextClick}
          />
          <TextInput
            id="id-email"
            label="Email address"
            type="email"
            name="email"
            value={emailInfo.value}
            errorMessage={emailInfo.error}
            onChange={handleEmailChange}
            ref={emailInputRef}
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
            value={passwordInfo.value}
            errorMessage={passwordInfo.error}
            onChange={handlePasswordChange}
            ref={passwordInputRef}
            onEnter={handleSignup}
          />
          <TextInput
            id="id-confirm-password"
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={cfmPasswordInfo.value}
            errorMessage={cfmPasswordInfo.error}
            onChange={handleCfmPasswordChange}
            ref={cfmPasswordInputRef}
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
