import { QUERY_KEY_ACCOUNT, QUERY_KEY_MESSAGES } from '@/constants';
import { Account, Message } from '@/types';
import { updateChatLastMessage } from '@/utils';
import queryClient from './queryClient';

const getMessagePartnerId = (message: Message) => {
  const account = queryClient.getQueryData<Account>([QUERY_KEY_ACCOUNT]);
  if (!account) throw new Error('Invalid account! You maynot loggedin!');
  return message.senderId === account.id
    ? message.receiverId
    : message.senderId;
};

const messagesCache = {
  add: (message: Message) => {
    const partnerId = getMessagePartnerId(message);
    queryClient.setQueryData(
      [QUERY_KEY_MESSAGES, partnerId],
      (messages: Message[]) => (messages ? [...messages, message] : [message]),
    );
    updateChatLastMessage(partnerId);
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
