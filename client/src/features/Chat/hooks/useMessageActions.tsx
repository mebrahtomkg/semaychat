import { useDownload } from '@/hooks';
import { Message } from '@/types';
import { useCallback } from 'react';
import { getFileExtension } from '@/utils';
import { setMessageInputState } from '@/store/useMessageInputStateStore';
import { addMessageDeleteRequest } from '@/store/useMessageRequestsStore';

const useMessageActions = (message: Message) => {
  const deleteMessage = useCallback(
    (deleteForReceiver = true) => {
      addMessageDeleteRequest({
        message: message,
        deleteForReceiver,
      });
    },
    [message],
  );

  const download = useDownload();

  const downloadFile = useCallback(() => {
    if (!message.attachment) return;
    download(
      `/messages/file-download/${message.id}`,
      `${message.id}`,
      `${getFileExtension(message.attachment.name)}`,
    );
  }, [message, download]);

  const edit = useCallback(() => {
    if (message.createdAt) setMessageInputState({ mode: 'edit', message });
  }, [message]);

  const reply = useCallback(() => {
    if (message.createdAt) setMessageInputState({ mode: 'reply', message });
  }, [message]);

  return {
    edit,
    reply,
    downloadFile,
    deleteMessage,
  };
};

export default useMessageActions;
