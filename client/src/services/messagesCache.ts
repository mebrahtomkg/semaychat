import { QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';
import { Message } from '@/types';
import { updateChatLastMessage } from '@/utils';

const messagesCache = {
  add: (partnerId: number, message: Message) => {
    queryClient.setQueryData(
      [QUERY_KEY_MESSAGES, partnerId],
      (messages: Message[]) => (messages ? [...messages, message] : [message]),
    );
    updateChatLastMessage(partnerId);
  },

  update: (partnerId: number, message: Message) => {
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
