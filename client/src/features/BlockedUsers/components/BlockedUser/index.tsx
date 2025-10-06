import { FC } from 'react';
import {
  BlockedUserStyled,
  Name,
  NameContainer,
  Photo,
  ProfilePhotoContainer,
} from './styles';
import { useImageLoader, useUserInfo } from '@/hooks';
import { User } from '@/types';
import { NameInitial } from '@/components';

interface BlockedUserProps {
  user: User;
}

const BlockedUser: FC<BlockedUserProps> = ({ user }) => {
  const { fullName, nameInitials, photoUrl } = useUserInfo(user);

  const { imageSrc, handleImageLoad, handleImageLoadError } =
    useImageLoader(photoUrl);

  return (
    <BlockedUserStyled to={`/chat/${user.id}`}>
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

      <NameContainer>
        <Name>{fullName}</Name>
      </NameContainer>
    </BlockedUserStyled>
  );
};

export default BlockedUser;
