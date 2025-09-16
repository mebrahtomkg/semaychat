import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { Chat, User } from '@/types';
import { manyUsersAdded } from '@/usersSlice';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useChatsFetcher = () => {
  const dispatch = useAppDispatch();

  const {
    isError,
    data: chats,
    error,
  } = useQuery({
    queryKey: ['chats'],
    queryFn: () => get<Chat[]>('/chats'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  useEffect(() => {
    if (chats) {
      const users: User[] = [];
      for (const chat of chats) {
        users.push(chat.partner);
      }
      dispatch(manyUsersAdded(users));
    }
  }, [chats, dispatch]);
};

export default useChatsFetcher;
