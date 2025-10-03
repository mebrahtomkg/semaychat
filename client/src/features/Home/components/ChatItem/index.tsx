import { FC } from 'react';
import {
  ChatDateTime,
  ChatDetailsContainer,
  ChatItemStyled,
  MessagePreview,
  Name,
  NameContainer,
  Photo,
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
          <Photo
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

      <ChatDetailsContainer>
        <NameContainer>
          <Name>{fullName}</Name>
          {dateTime && <ChatDateTime>{dateTime}</ChatDateTime>}
        </NameContainer>

        {messagePreview && <MessagePreview>{messagePreview}</MessagePreview>}
      </ChatDetailsContainer>
    </ChatItemStyled>
  );
};

export default ChatItem;
