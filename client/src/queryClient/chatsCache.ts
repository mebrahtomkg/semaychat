import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import { Chat, Message } from '@/types';
import queryClient from './queryClient';

const chatsCache = {
  incrementChatUnseenMessagesCount: (partnerId: number) => {
    queryClient.setQueryData<Chat[] | undefined>(
      [QUERY_KEY_CHATS],
      (chats): Chat[] => {
        if (!chats) return [];

        return chats.map((chat) => {
          if (chat.partner.id === partnerId) {
            const unseenMessagesCount = (chat.unseenMessagesCount || 0) + 1;
            return { ...chat, unseenMessagesCount };
          }

          return chat;
        });
      },
    );
  },

  updateChatLastMessage: (partnerId: number) => {
    const messages = queryClient.getQueryData<Message[]>([
      QUERY_KEY_MESSAGES,
      partnerId,
    ]);

    const lastMessage =
      messages && messages.length > 0
        ? messages[messages.length - 1]
        : undefined;

    queryClient.setQueryData([QUERY_KEY_CHATS], (chats: Chat[] | undefined) => {
      if (!chats) return [];
      return chats.map((chat) =>
        chat.partner.id === partnerId ? { ...chat, lastMessage } : chat,
      );
    });
  },

  setChatUnseenMessagesCount: (
    partnerId: number,
    unseenMessagesCount: number,
  ) => {
    queryClient.setQueryData([QUERY_KEY_CHATS], (chats: Chat[] | undefined) => {
      if (!chats) return [];
      return chats.map((chat) =>
        chat.partner.id === partnerId ? { ...chat, unseenMessagesCount } : chat,
      );
    });
  },

  getChat: (partnerId: number) => {
    return queryClient
      .getQueryData<Chat[]>([QUERY_KEY_CHATS])
      ?.find((chat) => chat.partner.id === partnerId);
  },
};

export default chatsCache;
