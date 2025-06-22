import { useAppDispatch, useDownload } from '@/hooks';
import { Message } from '@/types';
import { useCallback } from 'react';
import { messageDeleteRequestAdded } from '../slices/messageRequestsSlice';
import { useChatContext } from '.';

const useMessageActions = (message: Message) => {
  const dispatch = useAppDispatch();

  const deleteMessage = useCallback(
    (deleteForReceiver = true) => {
      dispatch(
        messageDeleteRequestAdded({
          messageId: message.id,
          deleteForReceiver
        })
      );
    },
    [dispatch, message.id]
  );

  const download = useDownload();

  const downloadFile = useCallback(() => {
    if (!message.attachment) return;
    download(
      `/messages/file-download/${message.id}`,
      `${message.id}`,
      `${message.attachment.extension}`
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
    deleteMessage
  };
};

export default useMessageActions;
