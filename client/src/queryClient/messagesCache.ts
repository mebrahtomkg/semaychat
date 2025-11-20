import {
  QUERY_KEY_ACCOUNT,
  QUERY_KEY_CHATS,
  QUERY_KEY_MESSAGES,
} from '@/constants';
import { Account, Chat, Message, User } from '@/types';
import queryClient from './queryClient';
import updateChatLastMessage from './updateChatLastMessage';

const getAccount = () => {
  const account = queryClient.getQueryData<Account>([QUERY_KEY_ACCOUNT]);
  if (!account) throw new Error('Invalid account! You maynot have loggedin!');
  return account;
};

const getMessagePartnerId = (message: Message) => {
  const account = getAccount();
  return message.senderId === account.id
    ? message.receiverId
    : message.senderId;
};

const incrementChatUnseenMessagesCount = (partnerId: number) => {
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
};

const messagesCache = {
  add: (message: Message, partner: User) => {
    const account = getAccount();

    // Update unseen messages count of the target if the message is received message.
    if (message.receiverId === account.id) {
      incrementChatUnseenMessagesCount(partner.id);
    }

    const existingChats = queryClient.getQueryData<Chat[] | undefined>([
      QUERY_KEY_CHATS,
    ]);

    const chatExists = existingChats?.some(
      (chat) => chat.partner.id === partner.id,
    );

    if (!chatExists) {
      const newChat: Chat = {
        partner,
        lastMessage: message,
        unseenMessagesCount: 1,
      };
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
