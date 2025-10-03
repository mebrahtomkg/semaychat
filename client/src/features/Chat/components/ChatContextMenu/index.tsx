import { MoreButton } from '@/components/buttons';
import ContextMenu, {
  MenuItemDescriptor,
  useContextMenu,
} from '@/components/ContextMenu';
import {
  AddContactIcon,
  BlockUserIcon,
  DeleteIcon,
  RemoveContactIcon,
  UnblockUserIcon,
} from '@/components/icons';
import { useUserActions, useUserInfo } from '@/hooks';
import { User } from '@/types';
import { FC, useMemo } from 'react';

interface ChatContextMenuProps {
  chatPartner: User;
}

const ChatContextMenu: FC<ChatContextMenuProps> = ({ chatPartner }) => {
  const { isContextMenuVisible, onMoreButtonClick, contextMenuControlProps } =
    useContextMenu();

  const { isContact, isBlocked } = useUserInfo(chatPartner);

  const { addToContacts, blockUser, removeFromContacts, unblockUser } =
    useUserActions(chatPartner);

  const menuItemsList = useMemo(() => {
    const menuItems: MenuItemDescriptor[] = [
      {
        icon: <DeleteIcon />,
        label: 'Delete Chat',
        action: () => undefined,
      },
    ];

    if (isContact) {
      menuItems.push({
        icon: <RemoveContactIcon />,
        label: 'Remove From contacts',
        action: removeFromContacts,
      });
    } else {
      menuItems.push({
        icon: <AddContactIcon />,
        label: 'Add To contacts',
        action: addToContacts,
      });
    }

    if (isBlocked) {
      menuItems.push({
        icon: <UnblockUserIcon />,
        label: 'Unblock',
        action: unblockUser,
      });
    } else {
      menuItems.push({
        icon: <BlockUserIcon />,
        label: 'Block',
        action: blockUser,
      });
    }

    return menuItems;
  }, [
    isContact,
    isBlocked,
    addToContacts,
    blockUser,
    removeFromContacts,
    unblockUser,
  ]);

  return (
    <>
      <MoreButton onClick={onMoreButtonClick} />
      {isContextMenuVisible && (
        <ContextMenu
          menuItems={menuItemsList}
          controlProps={contextMenuControlProps}
        />
      )}
    </>
  );
};

export default ChatContextMenu;
