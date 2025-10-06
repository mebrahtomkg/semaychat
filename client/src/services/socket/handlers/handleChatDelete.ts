import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';
import { Chat, Message } from '@/types';

interface ChatDeletePayload {
  partnerId: number; // User id who deleted the chat
  partnerMessagesDeleted: boolean; // Whether the user deleted messages he/she sent permanently
}

const handleChatDelete = ({
  partnerId,
  partnerMessagesDeleted,
}: ChatDeletePayload) => {
  // If partner deleted messages he/she sent to this user, delete those messages.
  if (partnerMessagesDeleted) {
    let lastMessage: Chat['lastMessage'];

    queryClient.setQueryData(
      [QUERY_KEY_MESSAGES, partnerId],
      (messages: Message[] | undefined) => {
        if (!messages) return [];
        const sentMessages = messages.filter(
          (message) => message.senderId !== partnerId,
        );
        lastMessage = sentMessages[sentMessages.length - 1];
        return sentMessages;
      },
    );

    // Update last message of the target chat
    queryClient.setQueryData([QUERY_KEY_CHATS], (chats: Chat[] | undefined) => {
      if (!chats) return [];
      return chats.map((chat) =>
        chat.partner.id === partnerId ? { ...chat, lastMessage } : chat,
      );
    });
  }

  // queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CHATS] });
  // queryClient.invalidateQueries({ queryKey: [QUERY_KEY_MESSAGES, partnerId] });
};

export default handleChatDelete;
