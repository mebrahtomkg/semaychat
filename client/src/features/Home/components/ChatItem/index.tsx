import { FC } from 'react';
import {
  ChatItemDateTime,
  ChatItemInfoContainer,
  ChatItemStyled,
  MessagePreview,
  MessagePreviewContainer,
  Name,
  NameContainer,
  PhotoImg,
  ProfilePhotoContainer,
  UnseenMessagesCount,
} from './styles';
import { useImageLoader, useUserInfo } from '@/hooks';
import { Chat } from '@/types';
import { NameInitial } from '@/components';
import useChatItemInfo from './useChatItemInfo';

interface ChatItemProps {
  chat: Chat;
}

const ChatItem: FC<ChatItemProps> = ({ chat }) => {
  const { fullName, nameInitials, photoUrl } = useUserInfo(chat.partner);

  const { messagePreview, dateTime } = useChatItemInfo(chat);

  const { unseenMessagesCount } = chat;

  const { imageSrc, handleImageLoad, handleImageLoadError } =
    useImageLoader(photoUrl);

  return (
    <ChatItemStyled to={`/chat/${chat.partner.id}`}>
      {imageSrc ? (
        <ProfilePhotoContainer>
          <PhotoImg
            src={imageSrc}
            onLoad={handleImageLoad}
            onError={handleImageLoadError}
          />
        </ProfilePhotoContainer>
      ) : (
        <ProfilePhotoContainer>
          <NameInitial isSmall={true} nameInitials={nameInitials} />
        </ProfilePhotoContainer>
      )}

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
