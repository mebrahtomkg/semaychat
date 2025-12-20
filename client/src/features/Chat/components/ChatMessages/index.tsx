import { FC, RefObject, useMemo } from 'react';
import BaseMessage from '../BaseMessage';
import { useChatMessages } from '../../hooks';

interface ChatMessagesProps {
  partnerId: number;
  intersectionObserverRootRef: RefObject<HTMLDivElement | null>;
}

const ChatMessages: FC<ChatMessagesProps> = ({
  partnerId,
  intersectionObserverRootRef,
}) => {
  const messages = useChatMessages(partnerId);

  const messagesInComponent = useMemo(() => {
    return messages.map((message, index) => (
      <BaseMessage
        key={`${message.id}`}
        message={message}
        isLastInGroup={
          messages[index + 1] &&
          messages[index + 1].senderId !== message.senderId
        }
        intersectionObserverRootRef={intersectionObserverRootRef}
      />
    ));
  }, [messages, intersectionObserverRootRef]);

  return <>{messagesInComponent}</>;
};

export default ChatMessages;
