import { useQuery } from '@tanstack/react-query';
import { get } from '@/api';
import { Message } from '@/types';
import { QUERY_KEY_MESSAGES } from '@/constants';

const useChatMessages = (partnerId: number) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY_MESSAGES, partnerId],
    queryFn: () => get<Message[]>(`/messages/${partnerId}`),
  });

  return data || [];
};

export default useChatMessages;
