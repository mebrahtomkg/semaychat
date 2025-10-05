import { User } from '@/types';
import { post } from '@/api';
import { useMutation } from '@tanstack/react-query';
import queryClient from '@/queryClient';
import { QUERY_KEY_CONTACTS } from '@/constants';
import useAbortController from './useAbortController';

const useAddContact = (user: User) => {
  const { prepareAbortController, getSignal, abort } = useAbortController();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => {
      prepareAbortController();
      return post('/contacts', { userId: user.id }, { signal: getSignal() });
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_CONTACTS] });
      const prevContacts = queryClient.getQueryData([QUERY_KEY_CONTACTS]);
      queryClient.setQueryData([QUERY_KEY_CONTACTS], (oldContacts) =>
        Array.isArray(oldContacts) ? [...oldContacts, user] : [user],
      );
      return { prevContacts };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData([QUERY_KEY_CONTACTS], context?.prevContacts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CONTACTS] });
    },
  });

  return {
    addContact: mutate,
    abort,
    ...rest,
  };
};

export default useAddContact;
