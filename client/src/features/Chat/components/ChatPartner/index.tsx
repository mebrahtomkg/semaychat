import { FC, MouseEvent, useState } from 'react';
import {
  CircularPhoto,
  Name,
  NameContainer,
  ProfileLink,
  Status,
  UserContainer
} from './styles';
import { CenteredImage } from '@/styles';
import { useUser, useImageLoader, useAppContext } from '@/hooks';
import NameInitial from '@/components/NameInitial';
import { User } from '@/types';
import Profile from '@/features/Profile';

interface ChatPartnerProps {
  user?: User;
}

const ChatPartner: FC<ChatPartnerProps> = ({ user }) => {
  const { fullName, nameInitials, photoUrl } = useUser(user);
  const { imageSrc, handleImageLoad } = useImageLoader(photoUrl);
  const { isLargeScreen } = useAppContext();

  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const openProfile = () => setIsProfileVisible(true);
  const closeProfile = (e: MouseEvent) => {
    e.stopPropagation();
    setIsProfileVisible(false);
  };

  return (
    <ProfileLink
      role="button"
      $isLargeScreen={isLargeScreen}
      onClick={openProfile}
    >
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

      {user && isProfileVisible && (
        <Profile user={user} onClose={closeProfile} />
      )}
    </ProfileLink>
  );
};

export default ChatPartner;
