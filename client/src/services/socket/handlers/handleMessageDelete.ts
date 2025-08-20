import queryClient from '@/queryClient';
import { Message } from '@/types';

interface MessageDeletePayload {
  partnerId: number;
  messageId: number;
}

const handleMessageDelete = (payload: MessageDeletePayload) => {
  const { partnerId, messageId } = payload;

  queryClient.setQueryData(
    ['messages', partnerId],
    (oldMessages: Message[]) => {
      if (!oldMessages) return undefined;

      return oldMessages.filter((oldMessage) => oldMessage.id !== messageId);
    },
  );

  //TODO: update chat list, incase a chat is displaying the deleted message in the chat list
};

export default handleMessageDelete;
