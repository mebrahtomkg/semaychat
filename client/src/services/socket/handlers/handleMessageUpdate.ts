import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';
import { Chat, Message } from '@/types';

const handleMessageUpdate = (message: Message) => {
  queryClient.setQueryData(
    [QUERY_KEY_MESSAGES, message.senderId],
    (oldMessages: Message[]) => {
      if (!oldMessages) return [];
      return oldMessages.map((oldMessage) =>
        oldMessage.id === message.id ? message : oldMessage,
      );
    },
  );

  queryClient.setQueryData([QUERY_KEY_CHATS], (oldChats: Chat[]) => {
    if (!oldChats) return [];

    return oldChats.map((chat) =>
      chat.lastMessage?.id === message.id
        ? { ...chat, lastMessage: message }
        : chat,
    );
  });
};

export default handleMessageUpdate;
