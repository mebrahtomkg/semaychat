import { FC, useCallback, useMemo } from 'react';
import {
  BlockedUserStyled,
  MoreButtonStyled,
  Name,
  NameContainer,
} from './styles';
import { useUnblockUser, useUserInfo } from '@/hooks';
import { User } from '@/types';
import { MoreIcon, SendIcon, UnblockUserIcon } from '@/components/icons';
import { useNavigate } from 'react-router';
import { useAppStateStore } from '@/store';
import ContextMenu, {
  IMenuItem,
  MenuItem,
  useContextMenu,
} from '@/components/ContextMenu';
import { ANIMATION_CONTEXT_MENU_FAST, WithAnimation } from '@/Animation';
import Avatar from '@/components/Avatar';

interface BlockedUserProps {
  user: User;
  index: number;
}

const BlockedUser: FC<BlockedUserProps> = ({ user, index }) => {
  const { fullName, nameInitials, photoUrl } = useUserInfo(user);

  const {
    isContextMenuVisible,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

  const closeSettingsModal = useAppStateStore(
    (state) => state.closeSettingsModal,
  );

  const { unblockUser } = useUnblockUser(user);

  const userChatLink = useMemo<string>(() => `/chat/${user.id}`, [user.id]);

  const navigate = useNavigate();

  const openInChat = useCallback(() => {
    closeSettingsModal();
    navigate(userChatLink);
  }, [navigate, userChatLink, closeSettingsModal]);

  const menuItems = useMemo<IMenuItem[]>(
    () => [
      <MenuItem
        key={'unblock'}
        icon={<UnblockUserIcon />}
        label="Unblock"
        action={unblockUser}
        onClose={closeContextMenu}
      />,
      <MenuItem
        key={'open-in-chat'}
        icon={<SendIcon />}
        label="Open in chat"
        action={openInChat}
        onClose={closeContextMenu}
      />,
    ],
    [unblockUser, openInChat, closeContextMenu],
  );

  return (
    <BlockedUserStyled onClick={openInChat}>
      <Avatar initials={nameInitials} imageUrl={photoUrl} itemIndex={index} />

      <NameContainer>
        <Name>{fullName}</Name>

        <MoreButtonStyled type="button" onClick={handleMoreButtonClick}>
          <MoreIcon />
        </MoreButtonStyled>
      </NameContainer>

      <WithAnimation
        isVisible={isContextMenuVisible}
        options={ANIMATION_CONTEXT_MENU_FAST}
        render={(style) => (
          <ContextMenu
            menuItems={menuItems}
            position={contextMenuPosition}
            onClose={closeContextMenu}
            animationStyle={style}
          />
        )}
      />
    </BlockedUserStyled>
  );
};

export default BlockedUser;
