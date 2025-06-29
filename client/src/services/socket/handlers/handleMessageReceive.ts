import queryClient from '@/queryClient';
import { Chat, Message } from '@/types';

const handleMessageReceive = (message: Message) => {
  queryClient.setQueryData(
    ['messages', message.senderId],

    (oldMessages: Message[]) => {
      if (!oldMessages) return [message];
      return [...oldMessages, message];
    }
  );

  queryClient.setQueryData(['chats'], (oldChats: Chat[]) => {
    return oldChats?.map((chat) =>
      chat.partner.id === message.senderId
        ? { ...chat, lastMessage: message }
        : chat
    );
  });

  //TODO: what about if new message is received from no chat list.
};

export default handleMessageReceive;
