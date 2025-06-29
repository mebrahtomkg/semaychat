import { Message } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';
import usePendingMessages from './usePendingMessages';
import { useMemo } from 'react';

const useChatMessages = (partnerId: number) => {
  const { isError, data, error, isFetching } = useQuery({
    queryKey: ['messages', partnerId],
    queryFn: () => get<Message[]>(`/messages/${partnerId}`),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2
  });

  if (isError) {
    console.error(error);
  }

  if (isFetching) {
    console.log('fetching messages of', partnerId);
  }

  const pendingMessages = usePendingMessages(partnerId);

  const messages = useMemo(() => {
    if (!data) return pendingMessages;
    return [...data, ...pendingMessages];
  }, [data, pendingMessages]);

  return messages;
};

export default useChatMessages;
