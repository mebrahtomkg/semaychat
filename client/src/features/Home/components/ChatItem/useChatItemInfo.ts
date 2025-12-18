import { useMemo } from 'react';
import { Chat } from '@/types';
import formatChatTimestamp from '../../formatChatTimestamp';
import { useCurrentDateTime } from '@/hooks';

const useChatItemInfo = (chat: Chat) => {
  const currentDateTime = useCurrentDateTime();

  const { lastMessage } = chat;
  const createdAt = lastMessage?.createdAt;

  const dateTime = useMemo(
    () => (createdAt ? formatChatTimestamp(createdAt, currentDateTime) : null),
    [createdAt, currentDateTime],
  );

  return { dateTime };
};

export default useChatItemInfo;
