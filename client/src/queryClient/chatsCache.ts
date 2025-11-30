import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import { Chat, Message } from '@/types';
import queryClient from './queryClient';

const setCache = (setterFn: (chats: Chat[]) => Chat[]) => {
  queryClient.setQueryData<Chat[]>([QUERY_KEY_CHATS], (chats) =>
    setterFn(chats || []),
  );
};

const chatsCache = {
  incrementChatUnseenMessagesCount: (partnerId: number) => {
    setCache((chats) =>
      chats.map((chat) =>
        chat.partner.id === partnerId
          ? {
              ...chat,
              unseenMessagesCount: (chat.unseenMessagesCount || 0) + 1,
            }
          : chat,
      ),
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

    setCache((chats) =>
      chats.map((chat) =>
        chat.partner.id === partnerId ? { ...chat, lastMessage } : chat,
      ),
    );
  },

  setChatUnseenMessagesCount: (
    partnerId: number,
    unseenMessagesCount: number,
  ) => {
    setCache((chats) =>
      chats.map((chat) =>
        chat.partner.id === partnerId ? { ...chat, unseenMessagesCount } : chat,
      ),
    );
  },

  getChat: (partnerId: number) => {
    return queryClient
      .getQueryData<Chat[]>([QUERY_KEY_CHATS])
      ?.find((chat) => chat.partner.id === partnerId);
  },

  handlePartnerConnect: (partnerId: number) => {
    setCache((chats) =>
      chats.map((chat) =>
        chat.partner.id === partnerId
          ? {
              ...chat,
              partner: {
                ...chat.partner,
                isOnline: true,
              },
            }
          : chat,
      ),
    );
  },

  handlePartnerDisconnect: (partnerId: number, lastSeenTime?: number) => {
    setCache((chats) =>
      chats.map((chat) =>
        chat.partner.id === partnerId
          ? {
              ...chat,
              partner: {
                ...chat.partner,
                isOnline: false,
                lastSeenAt: lastSeenTime,
              },
            }
          : chat,
      ),
    );
  },
};

export default chatsCache;
