import { messagesCache } from '@/queryClient';
import { Message } from '@/types';

const handleMessageUpdate = (message: Message) => messagesCache.update(message);

export default handleMessageUpdate;
