import { FC } from 'react';
import {
  ChatItemDateTime,
  ChatItemInfoContainer,
  ChatItemStyled,
  ClockIconContainer,
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
import { ClockIcon, DoubleTickIcon, TickIcon } from '@/components/icons';
import { useMessageStatus } from '@/features/Chat/hooks';

interface ChatItemProps {
  chat: Chat;
  index: number;
}

const ChatItem: FC<ChatItemProps> = ({ chat, index }) => {
  const lastMessage = chat.lastMessage;

  const lastMessageStatus = useMessageStatus(lastMessage?.id || 0);

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
            <UnseenMessagesCount>{unseenMessagesCount}</UnseenMessagesCount>
          )}

          {lastMessage && isLastMessageOutgoing && (
            <MessageStatusContainer>
              {lastMessageStatus === 'sending' ||
              lastMessageStatus === 'updating' ? (
                <ClockIconContainer>
                  <ClockIcon />
                </ClockIconContainer>
              ) : (
                <TickIconContainer>
                  {lastMessage.isSeen ? <DoubleTickIcon /> : <TickIcon />}
                </TickIconContainer>
              )}
            </MessageStatusContainer>
          )}
        </MessagePreviewContainer>
      </ChatItemInfoContainer>
    </ChatItemStyled>
  );
};

export default ChatItem;
