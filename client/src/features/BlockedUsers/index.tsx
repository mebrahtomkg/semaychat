import {
  BlockedUsersContainer,
  BlockedUsersModal,
  BlockedUsersOverlay,
  HeaderContainer,
} from './styles';
import { useBlockedUsers } from '@/hooks';
import { BlockedUser } from './components';
import { CloseButton } from '@/components/buttons';
import { CSSProperties, FC, useMemo } from 'react';
import { ModalTitle } from '@/styles';
import { useAnimation } from '@/Animation';

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
  const animationOptions = useMemo(
    () => ({
      initialStyles: {
        opacity: 0.5,
        transform: 'scale(0.8)',
      },
      finalStyles: {
        opacity: 1,
        transform: 'scale(1.0)',
      },
      transition: {
        property: ['transform', 'opacity'],
        duration: [200, 200],
        timingFunction: ['ease-in-out', 'ease-in-out'],
      },
    }),
    [],
  );

  const { isMounted, animationStyle } = useAnimation(
    isVisible,
    animationOptions,
  );

  return (
    isMounted && (
      <BlockedUsersBase {...restProps} animationStyle={animationStyle} />
    )
  );
};

export default BlockedUsers;
