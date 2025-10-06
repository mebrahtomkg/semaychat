import { QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';
import { Message } from '@/types';

interface MessageDeletePayload {
  partnerId: number;
  messageId: number;
}

const handleMessageDelete = ({
  partnerId,
  messageId,
}: MessageDeletePayload) => {
  queryClient.setQueryData(
    [QUERY_KEY_MESSAGES, partnerId],
    (oldMessages: Message[]) => {
      if (!oldMessages) return [];

      return oldMessages.filter((oldMessage) => oldMessage.id !== messageId);
    },
  );

  //TODO: update chat list, incase a chat is displaying the deleted message in the chat list
};

export default handleMessageDelete;
