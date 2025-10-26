import { messagesCache } from '@/queryClient';
import { Message, User } from '@/types';

interface MessageReceivePayload {
  message: Message;
  sender: User;
}

const handleMessageReceive = ({ message, sender }: MessageReceivePayload) => {
  messagesCache.add(message, sender);
};

export default handleMessageReceive;
