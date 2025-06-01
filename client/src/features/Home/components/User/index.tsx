import React, { FC } from 'react';
import {
  ChatDetailsContainer,
  DefaultProfilePhotoContainer,
  MessageDateTime,
  MessagePreview,
  Name,
  NameContainer,
  Photo,
  ProfilePhotoContainer,
  TextPhoto,
  UserStyled
} from './styles';
import { useImageLoader } from '../../../../hooks';
import { User as IUser, Message } from '../../../../types';
import useChatItem from './useChatItem';

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
        <DefaultProfilePhotoContainer>
          <TextPhoto>{nameInitials}</TextPhoto>
        </DefaultProfilePhotoContainer>
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
