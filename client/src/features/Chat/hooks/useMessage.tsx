import { useAppDispatch, useAppSelector, useDownload } from '@/hooks';
import { Message } from '@/types';
import { useCallback, useMemo } from 'react';
import type { MessageType } from '../types';
import {
  formatDateTime,
  formatTime,
  isAudio,
  isImage,
  isVideo
} from '../utils';
import useChatContext from './useChatContext';
import { API_BASE_URL } from '@/constants';
import { messageDeleteRequestAdded } from '../slices/messageRequestsSlice';
import useMessageStatus from './useMessageStatus';
import useMessageContent from './useMessageContent';

const useMessage = (message: Message) => {
  const selfId = useAppSelector((state) => state.account?.id);

  const dispatch = useAppDispatch();

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

  const status = useMessageStatus(
    message.id,
    typeof message.attachment?.name === 'string'
  );

  const content = useMessageContent(message.id, message.content);

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

  const fileUrl = useMemo(
    () => `${API_BASE_URL}/messages/file/${message.id}`,
    [message.id]
  );

  const { editMessage, replyMessage } = useChatContext();

  const edit = useCallback(() => {
    if (message.createdAt) editMessage(message);
  }, [editMessage, message]);

  const reply = useCallback(() => {
    if (message.createdAt) replyMessage(message);
  }, [replyMessage, message]);

  const type: MessageType = useMemo(() => {
    if (!message.attachment) return 'text';
    const extension = message.attachment.extension;
    if (isImage(extension)) return 'photo';
    if (isVideo(extension)) return 'video';
    if (isAudio(extension)) return 'audio';
    return 'file';
  }, [message.attachment]);

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
