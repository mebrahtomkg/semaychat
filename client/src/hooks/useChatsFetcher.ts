import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { Chat, Message, User } from '@/types';
import { manyUsersAdded } from '@/usersSlice';
import { manyMessagesAdded } from '@/features/Chat/slices/messagesSlice';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useChatsFetcher = () => {
  const dispatch = useAppDispatch();

  const { isError, data, error } = useQuery({
    queryKey: ['chats'],
    queryFn: () => get<Chat[]>('/chats'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  useEffect(() => {
    if (data) {
      const users: User[] = [];
      const messages: Message[] = [];

      for (const chat of data) {
        users.push(chat.partner);
        messages.push(chat.lastMessage as Message);
      }

      dispatch(manyUsersAdded(users));
      dispatch(manyMessagesAdded(messages));
    }
  }, [data, dispatch]);
};

export default useChatsFetcher;
