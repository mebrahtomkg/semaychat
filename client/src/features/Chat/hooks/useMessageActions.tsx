import { useDownload } from '@/hooks';
import { Message } from '@/types';
import { useCallback } from 'react';
import { useChatContext } from '.';
import { useMessageRequestsStore } from '@/store';

const useMessageActions = (message: Message) => {
  const addMessageDeleteRequest = useMessageRequestsStore(
    (state) => state.addMessageDeleteRequest,
  );

  const deleteMessage = useCallback(
    (deleteForReceiver = true) => {
      addMessageDeleteRequest({
        message: message,
        deleteForReceiver,
      });
    },
    [addMessageDeleteRequest, message],
  );

  const download = useDownload();

  const downloadFile = useCallback(() => {
    if (!message.attachment) return;
    download(
      `/messages/file-download/${message.id}`,
      `${message.id}`,
      `${message.attachment.extension}`,
    );
  }, [message, download]);

  const { editMessage, replyMessage } = useChatContext();

  const edit = useCallback(() => {
    if (message.createdAt) editMessage(message);
  }, [editMessage, message]);

  const reply = useCallback(() => {
    if (message.createdAt) replyMessage(message);
  }, [replyMessage, message]);

  return {
    edit,
    reply,
    downloadFile,
    deleteMessage,
  };
};

export default useMessageActions;
