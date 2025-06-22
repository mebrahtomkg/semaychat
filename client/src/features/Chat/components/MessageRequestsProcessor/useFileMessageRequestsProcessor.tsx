import { ApiError, post } from '@/api';
import { messageRequestDeleted } from '@/features/Chat/slices/messageRequestsSlice';
import { messageAdded } from '@/features/Chat/slices/messagesSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getMessageRequestFile } from '@/services/messageRequestFilesStore';
import { createAppSelector } from '@/store';
import { Message } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

// Selects the first file message request from the request Queue of messageRequests
const selectRequest = createAppSelector(
  [(state) => state.messageRequests],

  (requests) =>
    requests.filter((req) => req.requestType === 'FILE_MESSAGE_SEND')[0]
);

const useFileMessageRequestsProcessor = () => {
  const request = useAppSelector((state) => selectRequest(state));

  const dispatch = useAppDispatch();

  const queryKey = useMemo(
    () => (request ? ['/messages/file', request.requestId] : ['']),
    [request]
  );

  const queryFn = useCallback(async () => {
    if (!request) return null;

    const { receiverId, fileId, caption } = request.payload;

    const file = getMessageRequestFile(fileId);

    if (!file) {
      console.log('File not found in store!');
      return null;
    }

    const body = new FormData();
    body.append('receiverId', `${receiverId}`);
    body.append('attachment', file);
    if (caption) body.append('caption', caption);

    const message = await post<Message>('/messages/file', body);

    dispatch(messageAdded(message));
    dispatch(messageRequestDeleted(request.requestId));

    return null;
  }, [request, dispatch]);

  const retry = useCallback((_failureCount: number, error: Error) => {
    return !(error instanceof ApiError && error.status);
  }, []);

  const { isError, error } = useQuery({ queryKey, queryFn, retry });

  if (isError) console.log('File Message request error:', error);
};

export default useFileMessageRequestsProcessor;
