import { ApiError, post } from '@/api';
import { messageRequestDeleted } from '@/features/Chat/slices/messageRequestsSlice';
import { messageAdded } from '@/features/Chat/slices/messagesSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Message } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

const useFileMessageRequestsProcessor = () => {
  // Getting the first file message request from the request Queue of messageRequests
  const request = useAppSelector(
    (state) =>
      state.messageRequests.filter(
        (req) => req.requestType === 'FILE_MESSAGE_SEND'
      )[0]
  );

  const dispatch = useAppDispatch();

  const queryKey = useMemo(
    () => (request ? ['/messages/file', request.requestId] : ['']),
    [request]
  );

  const queryFn = useCallback(async () => {
    if (!request) return null;

    const { receiverId, file, caption } = request.payload;

    const body = new FormData();
    body.append('receiverId', `${receiverId}`);
    body.append('attachment', file);
    if (caption) body.append('caption', caption);

    const message = await post<Message>('/messages/file', body);

    dispatch(messageAdded(message));
    dispatch(messageRequestDeleted(request.requestId));
  }, [request, dispatch]);

  const retry = useCallback((_failureCount: number, error: Error) => {
    return !(error instanceof ApiError && error.status);
  }, []);

  const { isError, error } = useQuery({ queryKey, queryFn, retry });

  if (isError) console.log('File Message request error:', error);
};

export default useFileMessageRequestsProcessor;
