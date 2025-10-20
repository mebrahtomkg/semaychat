import { QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';
import { Message } from '@/types';
import { updateChatLastMessage } from '@/utils';

const handleMessageUpdate = (message: Message) => {
  const partnerId = message.senderId; // Since message can only be edited by the sender

  queryClient.setQueryData(
    [QUERY_KEY_MESSAGES, partnerId],
    (messages: Message[] | undefined) => {
      if (!messages) return [];
      return messages.map((oldMessage) =>
        oldMessage.id === message.id ? message : oldMessage,
      );
    },
  );

  updateChatLastMessage(partnerId);
};

export default handleMessageUpdate;
