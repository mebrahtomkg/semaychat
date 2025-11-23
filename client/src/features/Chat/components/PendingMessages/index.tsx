import { FC, RefObject, useEffect, useMemo } from 'react';
import BaseMessage from '../BaseMessage';
import usePendingMessages from './usePendingMessages';

interface PendingMessagesProps {
  receiverId: number;
  intersectionObserverRootRef: RefObject<HTMLDivElement | null>;
  scrollMessagesListToBottom: () => void;
}

const PendingMessages: FC<PendingMessagesProps> = ({
  receiverId,
  intersectionObserverRootRef,
  scrollMessagesListToBottom,
}) => {
  const messages = usePendingMessages(receiverId);

  const messagesInComponent = useMemo(() => {
    return messages.map((message, index) => (
      <BaseMessage
        key={`${message.id}`}
        message={message}
        isLastInGroup={
          !messages[index + 1] ||
          messages[index + 1].senderId !== message.senderId
        }
        intersectionObserverRootRef={intersectionObserverRootRef}
      />
    ));
  }, [messages, intersectionObserverRootRef]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollMessagesListToBottom();
    }
  }, [messages.length, scrollMessagesListToBottom]);

  return <>{messagesInComponent}</>;
};

export default PendingMessages;
