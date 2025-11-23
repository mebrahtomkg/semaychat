import { messagesCache } from '@/queryClient';

interface MessageMarkAsReadPayload {
  partnerId: number;
  messageId: number;
}

const handleMessageMarkAsRead = ({
  partnerId,
  messageId,
}: MessageMarkAsReadPayload) =>
  messagesCache.markAsRead(partnerId, messageId, 'sent');

export default handleMessageMarkAsRead;
