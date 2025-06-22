import { useMemo } from 'react';
import { useAppSelector } from '@/hooks';
import { Message } from '@/types';
import { usePendingMessages } from '.';

const useMessagesSelector = (chatPartnerId: number): Message[] => {
  const messages = useAppSelector((state) =>
    state.messages.filter(
      (message) =>
        message.receiverId === chatPartnerId ||
        message.senderId === chatPartnerId
    )
  );

  const pendingMessages = usePendingMessages(chatPartnerId);

  const selectedMessages = useMemo(
    () => [...messages, ...pendingMessages],
    [messages, pendingMessages]
  );

  return selectedMessages;
};

export default useMessagesSelector;
