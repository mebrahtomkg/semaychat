import { ApiError, post } from '@/api';
import { getMessageRequestFile } from '@/services/messageRequestFilesStore';
import useMessageRequestsStore, {
  deleteMessageRequest,
} from '@/store/useMessageRequestsStore';
import { Message, MessageRequest } from '@/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useShallow } from 'zustand/shallow';

const AttachmentUploadProcessor = () => {
  // Selects the first file message request from the request Queue of messageRequests
  const selector = useCallback(
    (requests: MessageRequest[]) =>
      requests.filter((req) => req.requestType === 'FILE_MESSAGE_SEND')[0],
    [],
  );

  const request = useMessageRequestsStore(useShallow(selector));

  const queryClient = useQueryClient();

  const queryKey = useMemo(
    () => (request ? ['/messages/file', request.requestId] : ['']),
    [request],
  );

  const queryFn = useCallback(async () => {
    if (!request) return null;

    const { receiverId, fileId, caption, width, height } = request.payload;

    const file = getMessageRequestFile(fileId);

    if (!file) {
      console.log('File not found in store!');
      return null;
    }

    const body = new FormData();
    body.append('receiverId', `${receiverId}`);
    body.append('attachment', file);
    if (width) body.append('width', width.toString());
    if (height) body.append('height', height.toString());
    if (caption) body.append('caption', caption);

    const message = await post<Message>('/messages/file', body);

    queryClient.setQueryData(
      ['messages', receiverId],
      (oldMessages: Message[]) => {
        if (!oldMessages) return [message];
        return [...oldMessages, message];
      },
    );

    deleteMessageRequest(request.requestId);

    return null;
  }, [request, queryClient]);

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
