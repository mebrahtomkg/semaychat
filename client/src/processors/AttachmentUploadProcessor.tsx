import { ApiError, post } from '@/api';
import { useMessageRequests } from '@/hooks';
import { messagesCache } from '@/queryClient';
import { getMessageRequestFile } from '@/services/messageRequestFilesStore';
import { deleteMessageRequest } from '@/store/useMessageRequestsStore';
import { Message, MessageRequest } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

const AttachmentUploadProcessor = () => {
  // Selects the first file message request from the request Queue of messageRequests
  const selector = useCallback(
    (requests: MessageRequest[]) =>
      requests.filter((req) => req.requestType === 'FILE_MESSAGE_SEND')[0],
    [],
  );

  const request = useMessageRequests(selector);

  const queryKey = useMemo(
    () => (request ? ['/messages/file', request.requestId] : ['']),
    [request],
  );

  const queryFn = useCallback(async () => {
    if (!request) return null;

    const { receiver, fileId, caption, width, height } = request.payload;

    const file = getMessageRequestFile(fileId);

    if (!file) {
      console.log('File not found in store!');
      return null;
    }

    const body = new FormData();
    body.append('receiverId', `${receiver.id}`);
    body.append('attachment', file);
    if (width) body.append('width', width.toString());
    if (height) body.append('height', height.toString());
    if (caption) body.append('caption', caption);

    const message = await post<Message>('/messages/file', body);

    messagesCache.add(message, request.payload.receiver);

    deleteMessageRequest(request.requestId);

    return null;
  }, [request]);

  const retry = useCallback((_failureCount: number, error: Error) => {
    return !(error instanceof ApiError && error.status);
  }, []);

  const { isError, error } = useQuery({ queryKey, queryFn, retry });

  if (isError) {
    console.log('File Message request error:', error);
  }

  return null;
};

export default AttachmentUploadProcessor;
