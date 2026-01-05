import { useCallback, useState } from 'react';
import { useAccountActions } from '@/hooks';
import { Account } from '@/types';
import {
  checkConfirmPassword,
  checkEmail,
  checkName,
  checkPassword,
} from '../utils';
import { post } from '@/api';
import useTextInput from '@/components/TextInput/useTextInput';

type SignUpStep = 'first' | 'second';

const useSignUp = () => {
  const { setAccount } = useAccountActions();
  const [step, setStep] = useState<SignUpStep>('first');

  const firstNameInput = useTextInput();
  const lastNameInput = useTextInput();
  const emailInput = useTextInput();
  const passwordInput = useTextInput();
  const cfmPasswordInput = useTextInput();

  const handleNextClick = useCallback(async () => {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();

    const firstNameError = checkName(firstName);
    const lastNameError = lastName ? checkName(lastName) : ''; // Since last name is optional
    const emailError = checkEmail(email);

    // If no any error go to next step. i.e passwords input stage
    if (!(firstNameError || lastNameError || emailError)) {
      setStep('second');
      return;
    }

    if (firstNameError) {
      firstNameInput.setError(firstNameError);
    }

    if (lastNameError) {
      lastNameInput.setError(lastNameError);
    }

    if (emailError) {
      emailInput.setError(emailError);
    }

    if (firstNameError) {
      firstNameInput.focusInput();
    } else if (lastNameError) {
      lastNameInput.focusInput();
    } else {
      emailInput.focusInput();
    }
  }, [
    firstNameInput.value,
    lastNameInput.value,
    emailInput.value,
    firstNameInput.setError,
    lastNameInput.setError,
    emailInput.setError,
    firstNameInput.focusInput,
    lastNameInput.focusInput,
    emailInput.focusInput,
  ]);

  const handleBackClick = useCallback(() => setStep('first'), []);

  const handleSignup = useCallback(async () => {
    const password = passwordInput.value.trim();
    const cfmPassword = cfmPasswordInput.value.trim();

    const passwordError = checkPassword(password);
    let cfmPasswordError = checkConfirmPassword(cfmPassword);

    if (!cfmPasswordError && cfmPassword !== password) {
      cfmPasswordError = 'Passwords do not match.';
    }

    if (passwordError || cfmPasswordError) {
      if (passwordError) {
        passwordInput.setError(passwordError);
        passwordInput.focusInput();
      }
      if (cfmPasswordError) {
        cfmPasswordInput.setError(cfmPasswordError);
        // if password had errors it would be the focused input already
        if (!passwordError) {
          cfmPasswordInput.focusInput();
        }
      }
    } else {
      try {
        const data = await post<Account>('/auth/signup', {
          firstName: firstNameInput.value.trim(), // first name was validated in the first step
          lastName: lastNameInput.value.trim(), // last name was validated in the first step
          email: emailInput.value.trim(), // email was validated in the first step
          password: password,
        });
        setAccount(data);
      } catch (err) {
        const error =
          (err as Error).message || 'Unkown error happened while signup!';

        cfmPasswordInput.setError(error);
      }
    }
  }, [
    passwordInput.value,
    cfmPasswordInput.value,
    passwordInput.setError,
    cfmPasswordInput.setError,
    passwordInput.focusInput,
    cfmPasswordInput.focusInput,
    firstNameInput.value,
    lastNameInput.value,
    emailInput.value,
    setAccount,
  ]);

  return {
    step,

    firstNameInput,
    lastNameInput,
    emailInput,

    handleNextClick,

    passwordInput,
    cfmPasswordInput,

    handleBackClick,
    handleSignup,
  };
};

export default useSignUp;
