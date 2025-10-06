import { FC, useCallback, useMemo } from 'react';
import {
  BlockedUserStyled,
  MoreButtonStyled,
  Name,
  NameContainer,
  Photo,
  ProfilePhotoContainer,
} from './styles';
import { useImageLoader, useUnblockUser, useUserInfo } from '@/hooks';
import { User } from '@/types';
import { NameInitial } from '@/components';
import { MoreIcon, SendIcon, UnblockUserIcon } from '@/components/icons';
import ContextMenu, {
  MenuItemDescriptor,
  useContextMenu,
} from '@/components/ContextMenu';
import { useNavigate } from 'react-router';
import { useAppStateStore } from '@/store';

interface BlockedUserProps {
  user: User;
}

const BlockedUser: FC<BlockedUserProps> = ({ user }) => {
  const { fullName, nameInitials, photoUrl } = useUserInfo(user);

  const { imageSrc, handleImageLoad, handleImageLoadError } =
    useImageLoader(photoUrl);

  const { isContextMenuVisible, onMoreButtonClick, contextMenuControlProps } =
    useContextMenu();

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

  const menuItems = useMemo<MenuItemDescriptor[]>(
    () => [
      {
        icon: <UnblockUserIcon />,
        label: 'Unblock',
        action: unblockUser,
      },
      {
        icon: <SendIcon />,
        label: 'Open in chat',
        action: openInChat,
      },
    ],
    [unblockUser, openInChat],
  );

  return (
    <BlockedUserStyled to={userChatLink}>
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

        <MoreButtonStyled type="button" onClick={onMoreButtonClick}>
          <MoreIcon />
        </MoreButtonStyled>
      </NameContainer>

      {isContextMenuVisible && (
        <ContextMenu
          controlProps={contextMenuControlProps}
          menuItems={menuItems}
        />
      )}
    </BlockedUserStyled>
  );
};

export default BlockedUser;
