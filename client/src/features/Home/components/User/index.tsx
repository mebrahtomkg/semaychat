import { FC } from 'react';
import {
  ChatDetailsContainer,
  MessageDateTime,
  MessagePreview,
  Name,
  NameContainer,
  Photo,
  ProfilePhotoContainer,
  UserStyled,
} from './styles';
import { useImageLoader } from '@/hooks';
import { User as IUser, Message } from '@/types';
import useChatItem from './useChatItem';
import { NameInitial } from '@/components';

interface UserProps {
  user: IUser;
  lastMessage?: Message;
}

const User: FC<UserProps> = ({ user, lastMessage }) => {
  const { fullName, nameInitials, photoUrl, messagePreview, messageDateTime } =
    useChatItem(user, lastMessage);

  const { imageSrc, handleImageLoad } = useImageLoader(photoUrl);

  return (
    <UserStyled to={`/chat/${user.id}`}>
      {imageSrc ? (
        <ProfilePhotoContainer>
          <Photo src={imageSrc} onLoad={handleImageLoad} />
        </ProfilePhotoContainer>
      ) : (
        <ProfilePhotoContainer>
          <NameInitial isSmall={true} nameInitials={nameInitials} />
        </ProfilePhotoContainer>
      )}

      <ChatDetailsContainer>
        <NameContainer>
          <Name>{fullName}</Name>
          {messageDateTime && (
            <MessageDateTime>{messageDateTime}</MessageDateTime>
          )}
        </NameContainer>

        {messagePreview && <MessagePreview>{messagePreview}</MessagePreview>}
      </ChatDetailsContainer>
    </UserStyled>
  );
};

export default User;
