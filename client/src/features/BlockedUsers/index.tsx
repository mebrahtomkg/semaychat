import {
  BlockedUsersContainer,
  BlockedUsersModal,
  BlockedUsersOverlay,
  HeaderContainer,
} from './styles';
import { useBlockedUsers } from '@/hooks';
import { BlockedUser } from './components';
import { CloseButton } from '@/components/buttons';
import { FC } from 'react';
import { ModalTitle } from '@/styles';

interface BlockedUsersProps {
  onClose: () => void;
}

const BlockedUsers: FC<BlockedUsersProps> = ({ onClose }) => {
  const blockedUsers = useBlockedUsers();

  return (
    <BlockedUsersOverlay>
      <BlockedUsersModal>
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
