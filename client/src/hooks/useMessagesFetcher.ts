import { useEffect } from 'react';
import { useAppDispatch } from '.';
import { Message } from '@/types';
import { manyMessagesAdded } from '@/features/Chat/slices/messagesSlice';
import { useQuery } from '@tanstack/react-query';
import { ApiError, get } from '@/api';

const useMessagesFetcher = (partnerId: number) => {
  const dispatch = useAppDispatch();

  const { isError, data, error } = useQuery({
    queryKey: [`/messages/${partnerId}`],
    queryFn: () => get<Message[]>(`/messages/${partnerId}`),
    retry: (failureCount: number, error: Error) =>
      error instanceof ApiError && error.status ? false : failureCount < 2,
  });

  useEffect(() => {
    if (data) dispatch(manyMessagesAdded(data));
  }, [data, dispatch]);

  if (isError) {
    console.error(error);
  }
};

export default useMessagesFetcher;
