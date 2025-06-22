import { useMemo } from 'react';
import { useAppSelector } from '@/hooks';
import { Message } from '@/types';
import { usePendingMessages } from '.';
import { createAppSelector } from '@/store';

const selectMessagesByPartner = createAppSelector(
  [(state) => state.messages, (_state, chatPartnerId: number) => chatPartnerId],
  (messages, chatPartnerId) =>
    messages.filter(
      (message) =>
        message.receiverId === chatPartnerId ||
        message.senderId === chatPartnerId
    )
);

const useMessagesSelector = (chatPartnerId: number): Message[] => {
  const messages = useAppSelector((state) =>
    selectMessagesByPartner(state, chatPartnerId)
  );

  const pendingMessages = usePendingMessages(chatPartnerId);

  const selectedMessages = useMemo(
    () => [...messages, ...pendingMessages],
    [messages, pendingMessages]
  );

  return selectedMessages;
};

export default useMessagesSelector;
