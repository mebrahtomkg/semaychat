import { useAppSelector } from '@/hooks';
import { Message } from '@/types';
import { useMemo } from 'react';
import {
  formatDateTime,
  formatTime,
  isAudio,
  isImage,
  isVideo
} from '../utils';
import { API_BASE_URL } from '@/constants';
import { useMessageStatus } from '.';

type MessageType = 'text' | 'photo' | 'audio' | 'video' | 'file';

const useMessageInfo = (message: Message) => {
  const selfId = useAppSelector((state) => state.account?.id);

  const isOutgoing = message.senderId === selfId;

  const chatPartnerId = isOutgoing ? message.receiverId : message.senderId;

  const time = useMemo(
    () => (message.createdAt ? formatTime(message.createdAt) : '??'),
    [message.createdAt]
  );

  const dateTime = useMemo(
    () => (message.createdAt ? formatDateTime(message.createdAt) : ''),
    [message.createdAt]
  );

  const status = useMessageStatus(
    message.id,
    typeof message.attachment?.name === 'string'
  );

  const fileUrl = useMemo(
    () =>
      message.id > 0 ? `${API_BASE_URL}/messages/file/${message.id}` : null,
    [message.id]
  );

  const type: MessageType = useMemo(() => {
    if (!message.attachment) return 'text';
    const extension = message.attachment.extension;
    if (isImage(extension)) return 'photo';
    if (isVideo(extension)) return 'video';
    if (isAudio(extension)) return 'audio';
    return 'file';
  }, [message.attachment]);

  return {
    type,
    isOutgoing,
    chatPartnerId,
    status,
    time,
    dateTime,
    fileUrl
  };
};

export default useMessageInfo;
