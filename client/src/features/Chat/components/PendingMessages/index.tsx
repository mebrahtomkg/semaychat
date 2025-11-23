import { FC, RefObject, useMemo } from 'react';
import BaseMessage from '../BaseMessage';
import usePendingMessages from './usePendingMessages';

interface PendingMessagesProps {
  receiverId: number;
  intersectionObserverRootRef: RefObject<HTMLDivElement | null>;
}

const PendingMessages: FC<PendingMessagesProps> = ({
  receiverId,
  intersectionObserverRootRef,
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

  return <>{messagesInComponent}</>;
};

export default PendingMessages;
