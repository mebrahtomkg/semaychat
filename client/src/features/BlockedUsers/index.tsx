import {
  BlockedUsersContainer,
  BlockedUsersModal,
  BlockedUsersOverlay,
  HeaderContainer,
} from './styles';
import { useBlockedUsers } from '@/hooks';
import { BlockedUser } from './components';
import { CloseButton } from '@/components/buttons';
import { CSSProperties, FC } from 'react';
import { ModalTitle } from '@/styles';

interface BlockedUsersProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const BlockedUsers: FC<BlockedUsersProps> = ({ onClose, animationStyle }) => {
  const blockedUsers = useBlockedUsers();

  return (
    <BlockedUsersOverlay style={{ ...animationStyle, transform: undefined }}>
      <BlockedUsersModal style={animationStyle}>
        <HeaderContainer>
          <ModalTitle>Blocked Users</ModalTitle>
          <CloseButton onClick={onClose} />
        </HeaderContainer>

        <BlockedUsersContainer>
          {blockedUsers.map((user) => (
            <BlockedUser key={`${user.id}`} user={user} />
          ))}
        </BlockedUsersContainer>
      </BlockedUsersModal>
    </BlockedUsersOverlay>
  );
};

export default BlockedUsers;
