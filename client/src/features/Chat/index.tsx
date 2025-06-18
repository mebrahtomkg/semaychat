import BackLink from '@/components/BackLink';
import { MoreButton } from '@/components/buttons';
import { useAppContext, useMessagesFetcher, useUserFetcher } from '@/hooks';
import { Message } from '@/types';
import { type FC, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router';
import ChatContext from './ChatContext';
import { MessageInput, User } from './components';
import BaseMessage from './components/BaseMessage';
import useChat from './hooks/useChat';
import useMessagesSelector from './hooks/useMessagesSelector';
import {
  ChatFooter,
  ChatHeader,
  ChatMessagesList,
  ChatMessagesListContainer,
  ChatStyled,
  Gap
} from './styles';

const Chat: FC = () => {
  const params = useParams();

  const chatPartnerId = params?.chatPartnerId
    ? Number.parseInt(params.chatPartnerId, 10)
    : 0;

  const { isLargeScreen } = useAppContext();

  const user = useUserFetcher(chatPartnerId);

  useMessagesFetcher(chatPartnerId);

  const messages: Message[] = useMessagesSelector(chatPartnerId);

  const messagesInComponent = useMemo(
    () =>
      messages.map((message, index) => (
        <BaseMessage
          key={`${message.id}`}
          message={message}
          isLastInGroup={
            !messages[index + 1] ||
            messages[index + 1].senderId !== message.senderId
          }
        />
      )),
    [messages]
  );

  const chatRef = useRef<HTMLDivElement | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (chatRef.current) {
      const messagesContainer: HTMLDivElement = chatRef.current;
      messagesContainer.scrollTop =
        messagesContainer.scrollHeight - messagesContainer.clientHeight;
    }
  }, [messages.length]);

  const chatContextLogic = useChat(chatPartnerId);

  return (
    <ChatContext.Provider value={chatContextLogic}>
      <ChatStyled>
        <ChatHeader>
          {!isLargeScreen && <BackLink />}
          <User userId={chatPartnerId} user={user} />
          <MoreButton onClick={() => undefined} />
        </ChatHeader>

        <ChatMessagesListContainer ref={chatRef}>
          <ChatMessagesList>
            <Gap />
            {messagesInComponent}
            <Gap />
          </ChatMessagesList>
        </ChatMessagesListContainer>

        <ChatFooter>
          <MessageInput />
        </ChatFooter>
      </ChatStyled>
    </ChatContext.Provider>
  );
};

export default Chat;
