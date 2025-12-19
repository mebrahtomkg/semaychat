import { FC } from 'react';
import {
  ChatItemDateTime,
  ChatItemInfoContainer,
  ChatItemStyled,
  HiddenUnseenMessagesCount,
  MessagePreviewContainer,
  MessageStatusContainer,
  Name,
  NameContainer,
  TickIconContainer,
  UnseenMessagesCount,
} from './styles';
import { useAccount, useUserInfo } from '@/hooks';
import { Chat } from '@/types';
import useChatItemInfo from './useChatItemInfo';
import Avatar from '@/components/Avatar';
import MessagePreview from './MessagePreview';
import { DoubleTickIcon, TickIcon } from '@/components/icons';
import useLastMessage from './useLastMessage';

interface ChatItemProps {
  chat: Chat;
  index: number;
}

const ChatItem: FC<ChatItemProps> = ({ chat, index }) => {
  const lastMessage = useLastMessage(chat);

  const { id: selfId } = useAccount();

  const { fullName, nameInitials, photoUrl, isOnline } = useUserInfo(
    chat.partner,
  );

  const { dateTime } = useChatItemInfo(chat);

  const unseenMessagesCount = chat.unseenMessagesCount || 0;

  const isLastMessageOutgoing = lastMessage && lastMessage.senderId === selfId;

  return (
    <ChatItemStyled to={`/chat/${chat.partner.id}`}>
      <Avatar
        initials={nameInitials}
        itemIndex={index}
        imageUrl={photoUrl}
        isOnline={isOnline}
      />

      <ChatItemInfoContainer>
        <NameContainer>
          <Name>{fullName}</Name>

          {dateTime && <ChatItemDateTime>{dateTime}</ChatItemDateTime>}
        </NameContainer>

        <MessagePreviewContainer>
          {lastMessage && <MessagePreview message={lastMessage} />}

          {unseenMessagesCount > 0 && (
            <>
              <HiddenUnseenMessagesCount>
                {unseenMessagesCount}
              </HiddenUnseenMessagesCount>
              <UnseenMessagesCount>{unseenMessagesCount}</UnseenMessagesCount>
            </>
          )}

          {lastMessage && isLastMessageOutgoing && (
            <MessageStatusContainer>
              {lastMessage.id > 0 ? (
                <TickIconContainer>
                  {lastMessage.isSeen ? <DoubleTickIcon /> : <TickIcon />}
                </TickIconContainer>
              ) : (
                'sending...'
              )}
            </MessageStatusContainer>
          )}
        </MessagePreviewContainer>
      </ChatItemInfoContainer>
    </ChatItemStyled>
  );
};

export default ChatItem;
