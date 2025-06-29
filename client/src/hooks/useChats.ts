import { Chat } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';
import { useMemo } from 'react';
import { useAppSelector } from '.';

const useChats = () => {
  const users = useAppSelector((state) => state.users);
  const contacts = useAppSelector((state) => state.contacts);
  const blockedUsers = useAppSelector((state) => state.blockedUsers);

  const { isError, data, error } = useQuery({
    queryKey: ['chats'],
    queryFn: () => get<Chat[]>('/chats'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2
  });

  if (isError) {
    console.error(error);
  }

  const chatsList = useMemo(() => {
    const chats = data || [];

    // Sort by recent
    chats.sort((a, b) =>
      b.lastMessage && a.lastMessage
        ? b.lastMessage.createdAt - a.lastMessage.createdAt
        : 0
    );

    // If chat list are not enough, add users from contact list.
    if (chats.length < 10) {
      for (const contact of contacts) {
        if (!chats.some((chat) => chat.partner.id === contact)) {
          const partner = users.find((user) => user.id === contact);
          if (partner) chats.push({ partner });
        }

        if (chats.length === 10) break;
      }
    }

    // If chat list are still not enough, add users from suggetions list.
    if (chats.length < 10) {
      for (const user of users) {
        const isBlocked = blockedUsers.some(
          (blockedUser) => blockedUser === user.id
        );

        if (!isBlocked && !chats.some((chat) => chat.partner.id === user.id)) {
          chats.push({ partner: user });
        }

        if (chats.length === 10) break;
      }
    }

    return chats;
  }, [data, contacts, users, blockedUsers]);

  return chatsList;
};

export default useChats;
