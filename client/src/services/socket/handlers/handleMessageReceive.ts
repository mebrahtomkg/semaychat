import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';
import { Chat, Message } from '@/types';

const handleMessageReceive = (message: Message) => {
  queryClient.setQueryData(
    [QUERY_KEY_MESSAGES, message.senderId],

    (oldMessages: Message[]) =>
      oldMessages ? [...oldMessages, message] : [message],
  );

  queryClient.setQueryData([QUERY_KEY_CHATS], (oldChats: Chat[]) => {
    if (!oldChats) return [];

    // Update last message of the target chat
    return oldChats.map((chat) =>
      chat.partner.id === message.senderId
        ? { ...chat, lastMessage: message }
        : chat,
    );
  });

  //TODO: what about if new message is received from no chat list.
};

export default handleMessageReceive;
