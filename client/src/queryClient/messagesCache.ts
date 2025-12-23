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

const setCache = (
  partnerId: number,
  setterFn: (messages: Message[]) => Message[],
) => {
  queryClient.setQueryData<Message[]>(
    [QUERY_KEY_MESSAGES, partnerId],
    (oldMessages) => {
      const messages = setterFn(oldMessages || []);

      // Update last message of the target chat.
      queryClient.setQueryData<Chat[]>([QUERY_KEY_CHATS], (chats) =>
        chats?.map((chat) =>
          chat.partner.id === partnerId
            ? {
                ...chat,
                lastMessage: messages[messages.length - 1],
              }
            : chat,
        ),
      );

      return messages;
    },
  );
};

const messagesCache = {
  add: (message: Message, partner: User) => {
    const isReceivedMessage = message.senderId === partner.id;
    const chatExists = !!chatsCache.getChat(partner.id);

    if (isReceivedMessage && chatExists) {
      chatsCache.incrementChatUnseenMessagesCount(partner.id);
    }

    if (!chatExists) {
      chatsCache.add({
        partner,
        lastMessage: message,
        unseenMessagesCount: isReceivedMessage ? 1 : 0,
      });
    }

    setCache(partner.id, (messages: Message[]) => [...messages, message]);
  },

  update: (message: Message) => {
    const partnerId = getMessagePartnerId(message);
    setCache(partnerId, (messages: Message[]) =>
      messages.map((oldMessage) =>
        oldMessage.id === message.id ? message : oldMessage,
      ),
    );
  },

  remove: (partnerId: number, messageId: number) => {
    setCache(partnerId, (messages: Message[]) =>
      messages.filter((message) => message.id !== messageId),
    );
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
