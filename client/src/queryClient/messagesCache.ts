import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import { Chat, Message, User } from '@/types';
import queryClient from './queryClient';
import accountCache from './accountCache';
import chatsCache from './chatsCache';

const getMessagePartnerId = (message: Message) => {
  const account = accountCache.get();
  return message.senderId === account.id
    ? message.receiverId
    : message.senderId;
};

const messagesCache = {
  add: (message: Message, partner: User) => {
    const account = accountCache.get();

    // Update unseen messages count of the target if the message is received message.
    if (message.receiverId === account.id) {
      chatsCache.incrementChatUnseenMessagesCount(partner.id);
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

    chatsCache.updateChatLastMessage(partner.id);
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
    chatsCache.updateChatLastMessage(partnerId);
  },

  remove: (partnerId: number, messageId: number) => {
    queryClient.setQueryData(
      [QUERY_KEY_MESSAGES, partnerId],
      (messages: Message[]) =>
        messages ? messages.filter((message) => message.id !== messageId) : [],
    );
    chatsCache.updateChatLastMessage(partnerId);
  },
};

export default messagesCache;
