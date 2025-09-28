import { useAccount } from '@/hooks';
import { Message } from '@/types';
import { useMemo } from 'react';
import {
  formatDateTime,
  formatTime,
  isAudio,
  isImage,
  isVideo,
} from '../utils';
import { API_BASE_URL } from '@/constants';
import { useMessageStatus } from '.';
import { getFileExtension } from '@/utils';

type MessageType = 'text' | 'photo' | 'audio' | 'video' | 'file';

const useMessageInfo = (message: Message) => {
  const { id: selfId } = useAccount();

  const isOutgoing = message.senderId === selfId;

  const chatPartnerId = isOutgoing ? message.receiverId : message.senderId;

  const time = useMemo(
    () => (message.createdAt ? formatTime(message.createdAt) : '??'),
    [message.createdAt],
  );

  const dateTime = useMemo(
    () => (message.createdAt ? formatDateTime(message.createdAt) : ''),
    [message.createdAt],
  );

  const status = useMessageStatus(
    message.id,
    typeof message.attachment?.name === 'string',
  );

  const fileUrl = useMemo(
    () =>
      message.id > 0 && message.attachment
        ? `${API_BASE_URL}/messages/file/${message.attachment.name}`
        : undefined,
    [message],
  );

  const type: MessageType = useMemo(() => {
    if (!message.attachment) return 'text';
    const extension = getFileExtension(message.attachment.name);
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
    fileUrl,
  };
};

export default useMessageInfo;
