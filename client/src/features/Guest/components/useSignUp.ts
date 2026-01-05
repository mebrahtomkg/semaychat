import { InputEventHandler, useCallback, useRef, useState } from 'react';
import { useAccountActions } from '@/hooks';
import { Account } from '@/types';
import {
  checkConfirmPassword,
  checkEmail,
  checkName,
  checkPassword,
} from '../utils';
import { post } from '@/api';
import { TextInputImperativeHandle } from '@/components/TextInput';

type SignUpStep = 'first' | 'second';

interface InputInfo {
  value: string;
  error: string;
}

const useSignUp = () => {
  const { setAccount } = useAccountActions();
  const [step, setStep] = useState<SignUpStep>('first');

  const firstNameInputRef = useRef<TextInputImperativeHandle | null>(null);
  const lastNameInputRef = useRef<TextInputImperativeHandle | null>(null);
  const emailInputRef = useRef<TextInputImperativeHandle | null>(null);
  const passwordInputRef = useRef<TextInputImperativeHandle | null>(null);
  const cfmPasswordInputRef = useRef<TextInputImperativeHandle | null>(null);

  const [firstNameInfo, setFirstNameInfo] = useState<InputInfo>({
    value: '',
    error: '',
  });

  const [lastNameInfo, setLastNameInfo] = useState<InputInfo>({
    value: '',
    error: '',
  });

  const [emailInfo, setEmailInfo] = useState<InputInfo>({
    value: '',
    error: '',
  });

  const [passwordInfo, setPasswordInfo] = useState<InputInfo>({
    value: '',
    error: '',
  });

  const [cfmPasswordInfo, setCfmPasswordInfo] = useState<InputInfo>({
    value: '',
    error: '',
  });

  const handleFirstNameChange: InputEventHandler<HTMLInputElement> =
    useCallback(
      (e) =>
        setFirstNameInfo({
          value: e.currentTarget.value,
          error: '',
        }),
      [],
    );

  const handleLastNameChange: InputEventHandler<HTMLInputElement> = useCallback(
    (e) =>
      setLastNameInfo({
        value: e.currentTarget.value,
        error: '',
      }),
    [],
  );

  const handleEmailChange: InputEventHandler<HTMLInputElement> = useCallback(
    (e) =>
      setEmailInfo({
        value: e.currentTarget.value,
        error: '',
      }),
    [],
  );

  const handleNextClick = useCallback(async () => {
    const firstName = firstNameInfo.value.trim();
    const lastName = lastNameInfo.value.trim();
    const email = emailInfo.value.trim();

    const firstNameError = checkName(firstName);
    const lastNameError = lastName ? checkName(lastName) : ''; // Since last name is optional
    const emailError = checkEmail(email);

    // If no any error go to next step. i.e passwords input stage
    if (!(firstNameError || lastNameError || emailError)) {
      setStep('second');
      return;
    }

    if (firstNameError) {
      setFirstNameInfo((prev) => ({ ...prev, error: firstNameError }));
      firstNameInputRef.current?.animateInfo();
    }

    if (lastNameError) {
      setLastNameInfo((prev) => ({ ...prev, error: lastNameError }));
      lastNameInputRef.current?.animateInfo();
    }

    if (emailError) {
      setEmailInfo((prev) => ({ ...prev, error: emailError }));
      emailInputRef.current?.animateInfo();
    }

    if (firstNameError) {
      firstNameInputRef.current?.focusInput();
    } else if (lastNameError) {
      lastNameInputRef.current?.focusInput();
    } else {
      emailInputRef.current?.focusInput();
    }
  }, [firstNameInfo.value, lastNameInfo.value, emailInfo.value]);

  const handleBackClick = useCallback(() => setStep('first'), []);

  const handlePasswordChange: InputEventHandler<HTMLInputElement> = useCallback(
    (e) =>
      setPasswordInfo({
        value: e.currentTarget.value,
        error: '',
      }),
    [],
  );

  const handleCfmPasswordChange: InputEventHandler<HTMLInputElement> =
    useCallback(
      (e) =>
        setCfmPasswordInfo({
          value: e.currentTarget.value,
          error: '',
        }),
      [],
    );

  const handleSignup = useCallback(async () => {
    const password = passwordInfo.value.trim();
    const cfmPassword = cfmPasswordInfo.value.trim();

    const passwordError = checkPassword(password);
    let cfmPasswordError = checkConfirmPassword(cfmPassword);

    if (!cfmPasswordError && cfmPassword !== password) {
      cfmPasswordError = 'Passwords do not match.';
    }

    if (passwordError || cfmPasswordError) {
      if (passwordError) {
        setPasswordInfo((prev) => ({ ...prev, error: passwordError }));
        passwordInputRef.current?.focusInput();
        passwordInputRef.current?.animateInfo();
      }
      if (cfmPasswordError) {
        setCfmPasswordInfo((prev) => ({ ...prev, error: cfmPasswordError }));
        cfmPasswordInputRef.current?.animateInfo();
        // if password had errors it would be the focused input already
        if (!passwordError) {
          cfmPasswordInputRef.current?.focusInput();
        }
      }
    } else {
      try {
        const data = await post<Account>('/auth/signup', {
          firstName: firstNameInfo.value.trim(), // first name was validated in the first step
          lastName: lastNameInfo.value.trim(), // last name was validated in the first step
          email: emailInfo.value.trim(), // email was validated in the first step
          password: password,
        });
        setAccount(data);
      } catch (err) {
        const error =
          (err as Error).message || 'Unkown error happened while signup!';

        setCfmPasswordInfo((prev) => ({ ...prev, error }));
        cfmPasswordInputRef.current?.animateInfo();
      }
    }
  }, [
    passwordInfo.value,
    cfmPasswordInfo.value,
    firstNameInfo.value,
    lastNameInfo.value,
    emailInfo.value,
    setAccount,
  ]);

  return {
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
  };
};

export default useSignUp;
