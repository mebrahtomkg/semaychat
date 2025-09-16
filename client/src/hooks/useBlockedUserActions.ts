import { User } from '@/types';
import { useCallback } from 'react';
import queryClient from '@/queryClient';
import { BLOCKED_USERS_QUERY_KEY } from './useBlockedUsers';

const useBlockedUserActions = () => {
  const addBlockedUser = useCallback((user: User) => {
    queryClient.setQueryData(
      [BLOCKED_USERS_QUERY_KEY],
      (blockedUsers: User[]) => {
        if (!blockedUsers) return [user];
        return [...blockedUsers, user];
      },
    );
  }, []);

  const deleteBlockedUser = useCallback((userId: number) => {
    queryClient.setQueryData(
      [BLOCKED_USERS_QUERY_KEY],
      (blockedUsers: User[]) => {
        if (!blockedUsers) return undefined;
        return blockedUsers.filter((user) => user.id !== userId);
      },
    );
  }, []);

  return {
    addBlockedUser,
    deleteBlockedUser,
  };
};

export default useBlockedUserActions;
