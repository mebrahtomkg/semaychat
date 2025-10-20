import { QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';
import { Message } from '@/types';
import { updateChatLastMessage } from '@/utils';

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
    (messages: Message[] | undefined) => {
      if (!messages) return [];
      return messages.filter((message) => message.id !== messageId);
    },
  );

  updateChatLastMessage(partnerId);
};

export default handleMessageDelete;
