import { FC, MouseEvent, useState } from 'react';
import {
  Name,
  NameContainer,
  ProfileLink,
  Status,
  UserContainer,
} from './styles';
import { useResponsive, useUserInfo } from '@/hooks';
import { User } from '@/types';
import Profile from '@/features/Profile';
import Avatar from '@/components/Avatar';
import { ANIMATION_SLIDE_IN, WithAnimation } from '@/Animation';

interface ChatPartnerProps {
  user: User;
}

const ChatPartner: FC<ChatPartnerProps> = ({ user }) => {
  const { fullName, nameInitials, photoUrl, isOnline, status } =
    useUserInfo(user);
  const { isLargeScreen } = useResponsive();

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
        <Avatar initials={nameInitials} isSmall={true} imageUrl={photoUrl} />

        <NameContainer>
          <Name>{fullName}</Name>
          <Status $isOnline={isOnline}>{status}</Status>
        </NameContainer>
      </UserContainer>

      <WithAnimation
        isVisible={isProfileVisible}
        options={ANIMATION_SLIDE_IN}
        render={(style) => (
          <Profile user={user} onClose={closeProfile} animationStyle={style} />
        )}
      />
    </ProfileLink>
  );
};

export default ChatPartner;
