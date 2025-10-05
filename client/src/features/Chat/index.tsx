import BackLink from '@/components/BackLink';
import { useResponsive, useUserFetcher } from '@/hooks';
import { Message } from '@/types';
import { type FC, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router';
import ChatContext from './ChatContext';
import {
  BaseMessage,
  MessageInput,
  ChatPartner,
  ChatContextMenu,
} from './components';
import {
  ChatFooter,
  ChatHeader,
  ChatMessagesList,
  ChatMessagesListContainer,
  ChatStyled,
  Gap,
} from './styles';
import { useChat } from './hooks';
import useChatMessages from './hooks/useChatMessages';

const Chat: FC = () => {
  const params = useParams();

  const chatPartnerId = params?.chatPartnerId
    ? Number.parseInt(params.chatPartnerId, 10)
    : 0;

  const { isLargeScreen } = useResponsive();

  const chatPartner = useUserFetcher(chatPartnerId);

  const messages: Message[] = useChatMessages(chatPartnerId, true);

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
    [messages],
  );

  const chatRef = useRef<HTMLDivElement | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: to scroll if messages length change
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

          {chatPartner && <ChatPartner user={chatPartner} />}

          {chatPartner && <ChatContextMenu chatPartner={chatPartner} />}
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
