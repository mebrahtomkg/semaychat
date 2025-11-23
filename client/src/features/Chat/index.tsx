import BackLink from '@/components/BackLink';
import { useResponsive, useUserFetcher } from '@/hooks';
import { type FC, useRef } from 'react';
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
import { chatsCache } from '@/queryClient';

const Chat: FC = () => {
  const params = useParams();

  const chatPartnerId = params?.chatPartnerId
    ? Number.parseInt(params.chatPartnerId, 10)
    : 0;

  const intersectionObserverRootRef = useRef<HTMLDivElement>(null);

  const { isLargeScreen } = useResponsive();

  const chatPartner =
    useUserFetcher(chatPartnerId) || chatsCache.getChat(chatPartnerId)?.partner;

  // const chatRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (chatRef.current) {
  //     const messagesContainer: HTMLDivElement = chatRef.current;
  //     messagesContainer.scrollTop =
  //       messagesContainer.scrollHeight - messagesContainer.clientHeight;
  //   }
  // }, [messages.length]);

  return (
    <ChatStyled>
      <ChatHeader>
        {!isLargeScreen && <BackLink />}

        {chatPartner && <ChatPartner user={chatPartner} />}

        {chatPartner && <ChatContextMenu chatPartner={chatPartner} />}
      </ChatHeader>

      <ChatMessagesListContainer ref={intersectionObserverRootRef}>
        <ChatMessagesList>
          <Gap />

          <ChatMessages
            partnerId={chatPartnerId}
            intersectionObserverRootRef={intersectionObserverRootRef}
          />

          <PendingMessages
            receiverId={chatPartnerId}
            intersectionObserverRootRef={intersectionObserverRootRef}
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
