import BackLink from '@/components/BackLink';
import { useResponsive, useUserFetcher } from '@/hooks';
import { type FC, useRef, useCallback } from 'react';
import { useParams } from 'react-router';
import {
  MessageInput,
  ChatPartner,
  ChatContextMenu,
  PendingMessages,
  ChatMessages,
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

const Chat: FC = () => {
  const params = useParams();

  const chatPartnerId = params?.chatPartnerId
    ? Number.parseInt(params.chatPartnerId, 10)
    : 0;

  const messagesListContainerRef = useRef<HTMLDivElement>(null);

  const { isLargeScreen } = useResponsive();

  const chat = useChat(chatPartnerId);

  const user = useUserFetcher(chatPartnerId);

  const chatPartner = chat?.partner || user;

  const scrollMessagesListToBottom = useCallback(() => {
    const messagesListContainer = messagesListContainerRef.current;
    if (messagesListContainer) {
      const { scrollHeight, clientHeight } = messagesListContainer;
      messagesListContainer.scrollTop = scrollHeight - clientHeight;
    }
  }, []);

  return (
    <ChatStyled>
      <ChatHeader>
        {!isLargeScreen && <BackLink />}

        {chatPartner && <ChatPartner user={chatPartner} />}

        {chatPartner && <ChatContextMenu chatPartner={chatPartner} />}
      </ChatHeader>

      <ChatMessagesListContainer ref={messagesListContainerRef}>
        <ChatMessagesList>
          <Gap />

          <ChatMessages
            partnerId={chatPartnerId}
            intersectionObserverRootRef={messagesListContainerRef}
          />

          <PendingMessages
            receiverId={chatPartnerId}
            intersectionObserverRootRef={messagesListContainerRef}
            scrollMessagesListToBottom={scrollMessagesListToBottom}
          />

          <Gap />
        </ChatMessagesList>
      </ChatMessagesListContainer>

      <ChatFooter>
        {chatPartner && <MessageInput chatPartner={chatPartner} />}
      </ChatFooter>
    </ChatStyled>
  );
};

export default Chat;
