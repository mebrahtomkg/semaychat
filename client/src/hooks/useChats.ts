import { Chat } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';
import { useMemo } from 'react';

export const CHATS_QUERY_KEY = 'chats';

const useChats = (): Chat[] => {
  const { isError, data, error } = useQuery({
    queryKey: [CHATS_QUERY_KEY],
    queryFn: () => get<Chat[]>('/chats'),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  if (isError) {
    console.error(error);
  }

  const chats = useMemo(() => {
    if (!data) return [];

    // Sort by recent
    return data.sort((a, b) =>
      b.lastMessage && a.lastMessage
        ? b.lastMessage.createdAt - a.lastMessage.createdAt
        : 0,
    );
  }, [data]);

  return chats;
};

export default useChats;
