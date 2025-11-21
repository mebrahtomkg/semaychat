import { QUERY_KEY_MESSAGES } from '@/constants';
import queryClient, { chatsCache } from '@/queryClient';
import { Message } from '@/types';

interface ChatDeletePayload {
  partnerId: number; // User id who deleted the chat
  partnerMessagesDeleted: boolean; // Whether the user deleted messages he/she sent permanently
}

const handleChatDelete = ({
  partnerId,
  partnerMessagesDeleted,
}: ChatDeletePayload) => {
  // If the partner deleted messages he/she sent to this user, delete those messages.
  if (partnerMessagesDeleted) {
    queryClient.setQueryData(
      [QUERY_KEY_MESSAGES, partnerId],
      (messages: Message[] | undefined) => {
        if (!messages) return [];
        return messages.filter((message) => message.senderId !== partnerId);
      },
    );

    // Update last message of the target chat
    chatsCache.updateChatLastMessage(partnerId);
  }
};

export default handleChatDelete;
