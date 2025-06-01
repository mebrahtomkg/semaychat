import { useCallback, useContext, useMemo } from 'react';
import {
  formatDateTime,
  formatTime,
  isAudio,
  isImage,
  isVideo
} from '../utils';
import { useAppSelector, useDownload } from '@/hooks';
import type { MessageType, PendingMessage, PersistedMessage } from '../types';
import { MRSContext } from '../MRS';
import useChatContext from './useChatContext';

const useMessage = (message: PersistedMessage | PendingMessage) => {
  const selfId = useAppSelector((state) => state.account?.id);

  const isOutgoing = message.senderId === selfId;

  const conversationPartnerId = isOutgoing
    ? message.receiverId
    : message.senderId;

  const [time, dateTime] = useMemo(
    () =>
      message.createdAt
        ? [formatTime(message.createdAt), formatDateTime(message.createdAt)]
        : ['', ''],
    [message.createdAt]
  );

  const MRS = useContext(MRSContext);
  if (!MRS) throw Error('Invalid MRSContext');
  const {
    getMessageStatus,
    getUpdatingMessageNewContent,
    deleteMessage: deleteMessageReal
  } = MRS;

  const status = useMemo(() => {
    const status = getMessageStatus(message.id);
    switch (status) {
      case 'sending':
        return message.isFile ? 'Uploading...' : 'Sending...';
      case 'updating':
        return 'Updating...';
      case 'deleting':
        return 'Deleting...';
    }
  }, [getMessageStatus, message.id, message.isFile]);

  const content = useMemo(
    () => getUpdatingMessageNewContent(message.id) || message.content,
    [getUpdatingMessageNewContent, message.content, message.id]
  );

  const deleteMessage = useCallback(
    (deleteForReceiver = true) => {
      deleteMessageReal(message.id, deleteForReceiver);
    },
    [deleteMessageReal, message.id]
  );

  const download = useDownload();

  const downloadFile = useCallback(() => {
    if (!message.isFile) return;
    download(
      `/messages/file-download/${message.id}`,
      `${message.id}`,
      `${message.fileExtension}`
    );
  }, [message, download]);

  const fileUrl = useMemo(() => `/messages/file/${message.id}`, [message.id]);

  const { editMessage, replyMessage } = useChatContext();

  const edit = useCallback(() => {
    if (message.createdAt) editMessage(message);
  }, [editMessage, message]);

  const reply = useCallback(() => {
    if (message.createdAt) replyMessage(message);
  }, [replyMessage, message]);

  const type: MessageType = useMemo(() => {
    if (!message.isFile) return 'text';
    if (isImage(message.fileExtension)) return 'photo';
    if (isVideo(message.fileExtension)) return 'video';
    if (isAudio(message.fileExtension)) return 'audio';
    return 'file';
  }, [message.fileExtension, message.isFile]);

  return {
    ...message,
    type,
    content,
    isOutgoing,
    conversationPartnerId,
    status,
    time,
    dateTime,
    fileUrl,
    deleteMessage,
    downloadFile,
    edit,
    reply
  };
};

export default useMessage;
