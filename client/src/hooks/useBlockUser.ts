import { User } from '@/types';
import { post } from '@/api';
import { useMutation } from '@tanstack/react-query';
import queryClient from '@/queryClient';
import { QUERY_KEY_BLOCKED_USERS } from '@/constants';
import useAbortController from './useAbortController';

const useBlockUser = (user: User) => {
  const { prepareAbortController, getSignal, abort } = useAbortController();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => {
      prepareAbortController();
      return post(
        '/blocked-users',
        { userId: user.id },
        { signal: getSignal() },
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY_BLOCKED_USERS] });

      const prevBlockedUsers = queryClient.getQueryData([
        QUERY_KEY_BLOCKED_USERS,
      ]);

      queryClient.setQueryData([QUERY_KEY_BLOCKED_USERS], (oldBlockedUsers) => {
        if (!Array.isArray(oldBlockedUsers)) return [user];
        const alreadyExists = oldBlockedUsers.some(
          (blockedUser) => blockedUser.id === user.id,
        );
        return alreadyExists ? oldBlockedUsers : [...oldBlockedUsers, user];
      });

      return { prevBlockedUsers };
    },
    onError: (_err, _vars, context) => {
      queryClient.setQueryData(
        [QUERY_KEY_BLOCKED_USERS],
        context?.prevBlockedUsers,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BLOCKED_USERS] });
    },
  });

  return {
    blockUser: mutate,
    abort,
    ...rest,
  };
};

export default useBlockUser;
