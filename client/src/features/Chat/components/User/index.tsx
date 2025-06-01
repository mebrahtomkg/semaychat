import React, { FC } from 'react';
import {
  CircularPhoto,
  Name,
  NameContainer,
  ProfileLink,
  Status,
  UserContainer
} from './styles';
import { CenteredImage } from '../../../../styles';
import { useUser, useImageLoader, useAppContext } from '../../../../hooks';
import { User as IUser } from '../../../../types';
import NameInitial from '../../../../components/NameInitial';

interface UserProps {
  userId: number; // Needed incase the user wasn't fatched already
  user?: IUser;
}

const User: FC<UserProps> = ({ userId, user }) => {
  const { fullName, nameInitials, photoUrl } = useUser(user);

  const { imageSrc, handleImageLoad } = useImageLoader(photoUrl);

  const { isLargeScreen } = useAppContext();

  return (
    <ProfileLink $isLargeScreen={isLargeScreen} to={`/profile/${userId}`}>
      <UserContainer>
        <CircularPhoto>
          {imageSrc ? (
            <CenteredImage
              src={imageSrc}
              alt="User profile photo"
              onLoad={handleImageLoad}
            />
          ) : (
            <NameInitial nameInitials={nameInitials} isSmall={true} />
          )}
        </CircularPhoto>

        <NameContainer>
          <Name>{fullName}</Name>
          <Status>{'Last seen recently'}</Status>
        </NameContainer>
      </UserContainer>
    </ProfileLink>
  );
};

export default User;
