import {
  QUERY_KEY_ACCOUNT,
  QUERY_KEY_CHATS,
  QUERY_KEY_MESSAGES,
} from '@/constants';
import { Account, Chat, Message, User } from '@/types';
import queryClient from './queryClient';
import updateChatLastMessage from './updateChatLastMessage';

const getMessagePartnerId = (message: Message) => {
  const account = queryClient.getQueryData<Account>([QUERY_KEY_ACCOUNT]);
  if (!account) throw new Error('Invalid account! You maynot loggedin!');
  return message.senderId === account.id
    ? message.receiverId
    : message.senderId;
};

const messagesCache = {
  add: (message: Message, partner: User) => {
    const existingChats = queryClient.getQueryData<Chat[] | undefined>([
      QUERY_KEY_CHATS,
    ]);
    const chatExists = existingChats?.some(
      (chat) => chat.partner.id === partner.id,
    );
    if (!chatExists) {
      const newChat: Chat = { partner, lastMessage: message };
      queryClient.setQueryData(
        [QUERY_KEY_CHATS],
        // No worry about order, chat display logic sort chats.
        (chats: Chat[]) => (chats ? [...chats, newChat] : [newChat]),
      );
    }
    queryClient.setQueryData(
      [QUERY_KEY_MESSAGES, partner.id],
      (messages: Message[]) => (messages ? [...messages, message] : [message]),
    );
    updateChatLastMessage(partner.id);
  },

  update: (message: Message) => {
    const partnerId = getMessagePartnerId(message);
    queryClient.setQueryData(
      [QUERY_KEY_MESSAGES, partnerId],
      (messages: Message[]) =>
        messages
          ? messages.map((oldMessage) =>
              oldMessage.id === message.id ? message : oldMessage,
            )
          : [message],
    );
    updateChatLastMessage(partnerId);
  },

  remove: (partnerId: number, messageId: number) => {
    queryClient.setQueryData(
      [QUERY_KEY_MESSAGES, partnerId],
      (messages: Message[]) =>
        messages ? messages.filter((message) => message.id !== messageId) : [],
    );
    updateChatLastMessage(partnerId);
  },
};

export default messagesCache;
