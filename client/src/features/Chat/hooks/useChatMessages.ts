import usePendingMessages from './usePendingMessages';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get } from '@/api';
import { Message } from '@/types';
import { QUERY_KEY_MESSAGES } from '@/constants';

const useChatMessages = (
  partnerId: number,
  includePendingMessages?: boolean,
) => {
  const pendingMessages = usePendingMessages(partnerId);

  const { data } = useQuery({
    queryKey: [QUERY_KEY_MESSAGES, partnerId],
    queryFn: () => get<Message[]>(`/messages/${partnerId}`),
  });

  const messages = data || [];

  const chatMessages = useMemo(() => {
    if (includePendingMessages) {
      return [...messages, ...pendingMessages];
    }

    return messages;
  }, [includePendingMessages, messages, pendingMessages]);

  return chatMessages;
};

export default useChatMessages;
