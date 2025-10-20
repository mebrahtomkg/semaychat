import { messagesCache } from '@/queryClient';
import { Message } from '@/types';

const handleMessageReceive = (message: Message) => {
  messagesCache.add(message);
  //TODO: what about if new message is received from no chat list.
};

export default handleMessageReceive;
