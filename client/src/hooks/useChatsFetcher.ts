import { useEffect, useState } from 'react';
import { useAPI, useAppDispatch, useAppSelector } from '.';
import { Chat, Message, User } from '../types';
import { manyUsersAdded } from '../usersSlice';
import { manyMessagesAdded } from '../features/Chat/slices/messagesSlice';

const useChatsFetcher = () => {
  const account = useAppSelector((state) => state.account);

  const isLoggedIn = account?.id;

  const [isFetched, setIsFetched] = useState(false);

  const dispatch = useAppDispatch();

  const { get } = useAPI();

  useEffect(() => {
    const fetchChats = async () => {
      const { success, data, message, status } = await get<Chat[]>('/chats');
      
      if (success) {
        const users: User[] = [];
        const messages: Message[] = [];

        for (const chat of data) {
          users.push(chat.partner);
          messages.push(chat.lastMessage as Message);
        }

        dispatch(manyUsersAdded(users));
        dispatch(manyMessagesAdded(messages));
      } else {
        console.error(message);
      }

      if (success || (status && status >= 400)) setIsFetched(true);
    };

    if (isLoggedIn && !isFetched) fetchChats();
  }, [dispatch, get, isFetched, isLoggedIn]);
};

export default useChatsFetcher;
