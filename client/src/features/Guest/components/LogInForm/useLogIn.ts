import { useCallback } from 'react';
import { Account } from '@/types';
import { post } from '@/api';
import { useTextInput } from '@/components/TextInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import queryClient from '@/queryClient';
import { QUERY_KEY_ACCOUNT } from '@/constants';
import { logInFormSchema, LogInFormSchema } from './schema';
import { useNavigate } from 'react-router';

const useLogIn = () => {
  const navigate = useNavigate();

  const logInForm = useForm<LogInFormSchema>({
    resolver: zodResolver(logInFormSchema),
  });

  const emailInput = useTextInput('email', logInForm);
  const passwordInput = useTextInput('password', logInForm);

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const { email, password } = logInForm.getValues();
      return post<Account>('/auth/login', {
        email: email.trim(),
        password: password.trim(),
      });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_ACCOUNT] });
    },
    onError: (err) => {
      logInForm.setError('password', {
        type: 'server',
        message: err.message || 'Login failed',
      });
      passwordInput.shakeError();
    },
    onSuccess(data) {
      queryClient.setQueryData([QUERY_KEY_ACCOUNT], data);
      navigate('/');
    },
  });

  const handleLogIn = useCallback(
    logInForm.handleSubmit(
      () => mutate(),

      (errors) => {
        if (errors.password) passwordInput.shakeError();
        if (errors.email) emailInput.shakeError();
      },
    ),
    [],
  );

  return {
    emailInput,
    passwordInput,
    handleLogIn,
    isPending,
  };
};

export default useLogIn;
