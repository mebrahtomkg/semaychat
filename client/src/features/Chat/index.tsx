import { type FC, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router';
import {
  ChatFooter,
  ChatHeader,
  ChatMessagesList,
  ChatMessagesListContainer,
  ChatStyled,
  Gap
} from './styles';
import BackLink from '../../components/BackLink';
import { MoreButton } from '../../components/buttons';
import { MessageInput, User } from './components';
import ChatContext from './ChatContext';
import useMessageInput from './components/MessageInput/useMessageInput';
import useMessagesSelector from './hooks/useMessagesSelector';
import type { PendingMessage, PersistedMessage } from './types';
import Message from './components/Message';
import { useAppContext, useMessagesFetcher, useUserFetcher } from '../../hooks';
import useChat from './hooks/useChat';

const Chat: FC = () => {
  const params = useParams();
  const chatPartnerId = params?.chatPartnerId
    ? parseInt(params.chatPartnerId, 10)
    : 0;

  const { isLargeScreen } = useAppContext();

  const user = useUserFetcher(chatPartnerId);

  useMessagesFetcher(chatPartnerId);

  const messages: (PersistedMessage | PendingMessage)[] =
    useMessagesSelector(chatPartnerId);

  const messagesInComponent = useMemo(
    () =>
      messages.map((message, index) => (
        <Message
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

  const chatContextLogic = useChat(chatPartnerId);

  const chatRef = useRef<HTMLDivElement | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (chatRef.current) {
      const messagesContainer: HTMLDivElement = chatRef.current;
      messagesContainer.scrollTop =
        messagesContainer.scrollHeight - messagesContainer.clientHeight;
    }
  }, [messages.length]);

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
