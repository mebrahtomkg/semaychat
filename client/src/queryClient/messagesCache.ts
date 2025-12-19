import { QUERY_KEY_MESSAGES } from '@/constants';
import { Message, User } from '@/types';
import queryClient from './queryClient';
import accountCache from './accountCache';
import chatsCache from './chatsCache';

const getMessagePartnerId = (message: Message) => {
  const account = accountCache.get();
  return message.senderId === account.id
    ? message.receiverId
    : message.senderId;
};

const getCache = (partnerId: number) =>
  queryClient.getQueryData<Message[]>([QUERY_KEY_MESSAGES, partnerId]) || [];

const setCache = (
  partnerId: number,
  setterFn: (messages: Message[]) => Message[],
) => {
  queryClient.setQueryData<Message[]>(
    [QUERY_KEY_MESSAGES, partnerId],
    (messages) => setterFn(messages || []),
  );
};

const messagesCache = {
  add: (message: Message, partner: User) => {
    const isReceivedMessage = message.senderId === partner.id;
    const chatExists = !!chatsCache.getChat(partner.id);

    if (!chatExists) {
      chatsCache.add({
        partner,
        lastMessage: message,
        unseenMessagesCount: isReceivedMessage ? 1 : 0,
      });
      return;
    }

    // If the message is a received message, update unseen messages count of the target chat,
    if (isReceivedMessage) {
      chatsCache.incrementChatUnseenMessagesCount(partner.id);
    }

    setCache(partner.id, (messages: Message[]) => [...messages, message]);
    chatsCache.updateChatLastMessage(partner.id);
  },

  update: (message: Message) => {
    const partnerId = getMessagePartnerId(message);
    setCache(partnerId, (messages: Message[]) =>
      messages.map((oldMessage) =>
        oldMessage.id === message.id ? message : oldMessage,
      ),
    );
    chatsCache.updateChatLastMessage(partnerId);
  },

  remove: (partnerId: number, messageId: number) => {
    setCache(partnerId, (messages: Message[]) =>
      messages.filter((message) => message.id !== messageId),
    );
    chatsCache.updateChatLastMessage(partnerId);
  },

  markAsRead: (
    partnerId: number,
    messageId: number,
    messagesType: 'sent' | 'received',
  ) => {
    const account = accountCache.get();
    setCache(partnerId, (messages: Message[]) =>
      messages.map((message) =>
        (messagesType === 'sent'
          ? message.senderId === account.id
          : message.receiverId === account.id) &&
        message.id <= messageId &&
        !message.isSeen
          ? { ...message, isSeen: true }
          : message,
      ),
    );
  },
};

export default messagesCache;
