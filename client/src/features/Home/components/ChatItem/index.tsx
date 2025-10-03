import { FC } from 'react';
import {
  ChatItemDateTime,
  ChatItemInfoContainer,
  ChatItemStatusContainer,
  ChatItemStyled,
  MessagePreview,
  Name,
  NameContainer,
  PhotoImg,
  ProfilePhotoContainer,
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

          {messagePreview && <MessagePreview>{messagePreview}</MessagePreview>}
        </NameContainer>

        <ChatItemStatusContainer>
          {dateTime && <ChatItemDateTime>{dateTime}</ChatItemDateTime>}
        </ChatItemStatusContainer>
      </ChatItemInfoContainer>
    </ChatItemStyled>
  );
};

export default ChatItem;
