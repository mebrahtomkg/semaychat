import { FC } from 'react';
import {
  ChatItemDateTime,
  ChatItemInfoContainer,
  ChatItemStyled,
  MessagePreview,
  MessagePreviewContainer,
  Name,
  NameContainer,
  UnseenMessagesCount,
} from './styles';
import { useUserInfo } from '@/hooks';
import { Chat } from '@/types';
import useChatItemInfo from './useChatItemInfo';
import Avatar from '@/components/Avatar';

interface ChatItemProps {
  chat: Chat;
  index: number;
}

const ChatItem: FC<ChatItemProps> = ({ chat, index }) => {
  const { fullName, nameInitials, photoUrl, isOnline } = useUserInfo(
    chat.partner,
  );

  const { messagePreview, dateTime } = useChatItemInfo(chat);

  const { unseenMessagesCount } = chat;

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
          {messagePreview && <MessagePreview>{messagePreview}</MessagePreview>}

          {(unseenMessagesCount || 0) > 0 && (
            <UnseenMessagesCount>{unseenMessagesCount}</UnseenMessagesCount>
          )}
        </MessagePreviewContainer>
      </ChatItemInfoContainer>
    </ChatItemStyled>
  );
};

export default ChatItem;
