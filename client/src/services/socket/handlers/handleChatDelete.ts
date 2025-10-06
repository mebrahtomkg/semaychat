import { QUERY_KEY_CHATS, QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';

interface ChatDeletePayload {
  partnerId: number;
}

const handleChatDelete = ({ partnerId }: ChatDeletePayload) => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY_CHATS] });
  queryClient.invalidateQueries({ queryKey: [QUERY_KEY_MESSAGES, partnerId] });
};

export default handleChatDelete;
