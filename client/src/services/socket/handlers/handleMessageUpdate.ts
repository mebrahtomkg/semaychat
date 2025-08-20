import queryClient from '@/queryClient';
import { Chat, Message } from '@/types';

const handleMessageUpdate = (message: Message) => {
  queryClient.setQueryData(
    ['messages', message.senderId],
    (oldMessages: Message[]) => {
      if (!oldMessages) return undefined;
      return oldMessages.map((oldMessage) =>
        oldMessage.id === message.id ? message : oldMessage,
      );
    },
  );

  queryClient.setQueryData(['chats'], (oldChats: Chat[]) => {
    if (!oldChats) return;

    return oldChats.map((chat) =>
      chat.lastMessage?.id === message.id
        ? { ...chat, lastMessage: message }
        : chat,
    );
  });
};

export default handleMessageUpdate;
