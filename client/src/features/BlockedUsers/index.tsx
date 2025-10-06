import {
  BlockedUsersContainer,
  BlockedUsersModal,
  BlockedUsersOverlay,
  HeaderContainer,
} from './styles';
import { useAnimation, useBlockedUsers } from '@/hooks';
import { BlockedUser } from './components';
import { CloseButton } from '@/components/buttons';
import { CSSProperties, FC } from 'react';
import { ModalTitle } from '@/styles';

interface BlockedUsersBaseProps {
  onClose: () => void;
  animationStyle?: CSSProperties;
}

const BlockedUsersBase: FC<BlockedUsersBaseProps> = ({
  onClose,
  animationStyle,
}) => {
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

interface BlockedUsersProps
  extends Omit<BlockedUsersBaseProps, 'animationStyle'> {
  isVisible: boolean;
}

const BlockedUsers: FC<BlockedUsersProps> = ({ isVisible, ...restProps }) => {
  const { isMounted, animationStyle } = useAnimation(isVisible);

  return (
    isMounted && (
      <BlockedUsersBase {...restProps} animationStyle={animationStyle} />
    )
  );
};

export default BlockedUsers;
