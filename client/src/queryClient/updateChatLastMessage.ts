import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';
import { Chat, Message } from '@/types';

const updateChatLastMessage = (chatPartnerId: number) => {
  const messages = queryClient.getQueryData<Message[]>([
    QUERY_KEY_MESSAGES,
    chatPartnerId,
  ]);

  const lastMessage =
    messages && messages.length > 0 ? messages[messages.length - 1] : undefined;

  queryClient.setQueryData([QUERY_KEY_CHATS], (chats: Chat[] | undefined) => {
    if (!chats) return [];
    return chats.map((chat) =>
      chat.partner.id === chatPartnerId ? { ...chat, lastMessage } : chat,
    );
  });
};

export default updateChatLastMessage;
