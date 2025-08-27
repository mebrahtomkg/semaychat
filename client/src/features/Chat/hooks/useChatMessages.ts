import usePendingMessages from './usePendingMessages';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';
import { Message } from '@/types';

const useChatMessages = (
  partnerId: number,
  includePendingMessages?: boolean,
) => {
  const { isError, data, error } = useQuery({
    queryKey: ['messages', partnerId],
    queryFn: () => get<Message[]>(`/messages/${partnerId}`),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  const messages = data || [];

  const pendingMessages = usePendingMessages(partnerId);

  const chatMessages = useMemo(() => {
    if (includePendingMessages) {
      return [...messages, ...pendingMessages];
    }

    return messages;
  }, [includePendingMessages, messages, pendingMessages]);

  return chatMessages;
};

export default useChatMessages;
