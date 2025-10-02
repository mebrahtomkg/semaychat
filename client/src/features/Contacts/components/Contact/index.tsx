import { FC } from 'react';
import {
  ContactStyled,
  Name,
  NameContainer,
  Photo,
  ProfilePhotoContainer,
} from './styles';
import { useImageLoader } from '@/hooks';
import { User } from '@/types';
import { NameInitial } from '@/components';
import useContact from './useContact';

interface ContactProps {
  user: User;
}

const Contact: FC<ContactProps> = ({ user }) => {
  const { fullName, nameInitials, photoUrl } = useContact(user);

  const { imageSrc, handleImageLoad, handleImageLoadError } =
    useImageLoader(photoUrl);

  return (
    <ContactStyled to={`/chat/${user.id}`}>
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
    </ContactStyled>
  );
};

export default Contact;
