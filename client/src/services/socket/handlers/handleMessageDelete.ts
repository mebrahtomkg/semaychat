import { messagesCache } from '@/queryClient';

interface MessageDeletePayload {
  partnerId: number;
  messageId: number;
}

const handleMessageDelete = ({ partnerId, messageId }: MessageDeletePayload) =>
  messagesCache.remove(partnerId, messageId);

export default handleMessageDelete;
