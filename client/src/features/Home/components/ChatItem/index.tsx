import { FC } from 'react';
import {
  ChatItemDateTime,
  ChatItemInfoContainer,
  ChatItemStyled,
  HiddenUnseenMessagesCount,
  MessagePreviewContainer,
  Name,
  NameContainer,
  UnseenMessagesCount,
} from './styles';
import { useUserInfo } from '@/hooks';
import { Chat } from '@/types';
import useChatItemInfo from './useChatItemInfo';
import Avatar from '@/components/Avatar';
import MessagePreview from './MessagePreview';

interface ChatItemProps {
  chat: Chat;
  index: number;
}

const ChatItem: FC<ChatItemProps> = ({ chat, index }) => {
  const { lastMessage } = chat;

  const { fullName, nameInitials, photoUrl, isOnline } = useUserInfo(
    chat.partner,
  );

  const { dateTime } = useChatItemInfo(chat);

  const unseenMessagesCount = chat.unseenMessagesCount || 0;

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
        </MessagePreviewContainer>
      </ChatItemInfoContainer>
    </ChatItemStyled>
  );
};

export default ChatItem;
