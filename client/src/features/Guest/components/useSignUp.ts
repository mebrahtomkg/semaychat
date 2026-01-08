import { useCallback, useState } from 'react';
import { useAccountActions } from '@/hooks';
import { Account } from '@/types';
import { post } from '@/api';
import { useTextInput } from '@/components/TextInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FirstSignUpFormSchema,
  firstSignUpFormSchema,
  SecondSignUpFormSchema,
  secondSignUpFormSchema,
} from './schema';

type SignUpStep = 'first' | 'second';

const useSignUp = () => {
  const { setAccount } = useAccountActions();
  const [step, setStep] = useState<SignUpStep>('first');

  const firstForm = useForm<FirstSignUpFormSchema>({
    resolver: zodResolver(firstSignUpFormSchema),
    mode: 'onBlur',
  });

  const secondForm = useForm<SecondSignUpFormSchema>({
    resolver: zodResolver(secondSignUpFormSchema),
    mode: 'onBlur',
  });

  const firstNameInput = useTextInput('firstName', firstForm);
  const lastNameInput = useTextInput('lastName', firstForm);
  const emailInput = useTextInput('email', firstForm);

  const passwordInput = useTextInput('password', secondForm);
  const cfmPasswordInput = useTextInput('confirmPassword', secondForm);

  const handleNextClick = useCallback(
    firstForm.handleSubmit(
      () => setStep('second'),

      (errors) => {
        if (errors.firstName) firstNameInput.shakeError();
        if (errors.lastName) lastNameInput.shakeError();
        if (errors.email) emailInput.shakeError();
      },
    ),
    [],
  );

  const handleBackClick = useCallback(() => setStep('first'), []);

  const handleSignup = useCallback(
    secondForm.handleSubmit(
      async (formData) => {
        try {
          const firstFormValues = firstForm.getValues();

          const data = await post<Account>('/auth/signup', {
            firstName: firstFormValues.firstName.trim(),
            lastName: firstFormValues.lastName?.trim(),
            email: firstFormValues.email.trim(),
            password: formData.password,
          });
          setAccount(data);
        } catch (err) {
          const error = (err as Error).message || 'Signup failed';

          secondForm.setError('confirmPassword', {
            type: 'server',
            message: error,
          });
          cfmPasswordInput.shakeError();
        }
      },

      (errors) => {
        if (errors.password) passwordInput.shakeError();
        if (errors.confirmPassword) cfmPasswordInput.shakeError();
      },
    ),
    [],
  );

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
