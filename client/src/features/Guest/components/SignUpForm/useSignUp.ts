import { useCallback, useState } from 'react';
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
import { useMutation } from '@tanstack/react-query';
import queryClient from '@/queryClient';
import { QUERY_KEY_ACCOUNT } from '@/constants';

type SignUpStep = 'first' | 'second';

const useSignUp = () => {
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

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const { firstName, lastName, email } = firstForm.getValues();
      const { password } = secondForm.getValues();
      return post<Account>('/auth/signup', {
        firstName: firstName.trim(),
        lastName: lastName?.trim(),
        email: email.trim(),
        password: password,
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_ACCOUNT] });
    },
    onError: (err) => {
      secondForm.setError('confirmPassword', {
        type: 'server',
        message: err.message || 'Signup failed',
      });
      cfmPasswordInput.shakeError();
    },
    onSuccess(data) {
      queryClient.setQueryData([QUERY_KEY_ACCOUNT], data);
    },
  });

  const handleSignup = useCallback(
    secondForm.handleSubmit(
      () => mutate(),

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

    isPending,
  };
};

export default useSignUp;
