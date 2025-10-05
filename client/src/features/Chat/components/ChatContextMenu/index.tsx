import { ConfirmDialog } from '@/components';
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
import {
  useAddContact,
  useBlockUser,
  useRemoveContact,
  useUnblockUser,
  useUserInfo,
} from '@/hooks';
import { useMessageRequestsStore } from '@/store';
import { User } from '@/types';
import { FC, useCallback, useMemo, useState } from 'react';

interface ChatContextMenuProps {
  chatPartner: User;
}

type Confirmation = 'delete-chat' | 'block-user' | null;

const ChatContextMenu: FC<ChatContextMenuProps> = ({ chatPartner }) => {
  const addChatDeleteRequest = useMessageRequestsStore(
    (state) => state.addChatDeleteRequest,
  );

  const { isContextMenuVisible, onMoreButtonClick, contextMenuControlProps } =
    useContextMenu();

  const { isContact, isBlocked } = useUserInfo(chatPartner);
  const { blockUser } = useBlockUser(chatPartner);
  const { unblockUser } = useUnblockUser(chatPartner);
  const { addContact } = useAddContact(chatPartner);
  const { removeContact } = useRemoveContact(chatPartner);

  const deleteChat = useCallback(() => {
    addChatDeleteRequest({
      chatPartnerId: chatPartner.id,
      deleteForReceiver: false,
    });
  }, [addChatDeleteRequest, chatPartner.id]);

  const [confirmation, setConfirmation] = useState<Confirmation>(null);

  const closeConfirmDialog = useCallback(() => setConfirmation(null), []);

  const startDeleteChatFlow = useCallback(
    () => setConfirmation('delete-chat'),
    [],
  );

  const startBlockUserFlow = useCallback(
    () => setConfirmation('block-user'),
    [],
  );

  const activeConfirmDialogComponent = useMemo(() => {
    switch (confirmation) {
      case 'delete-chat':
        return (
          <ConfirmDialog
            title="Delete Chat"
            message="Are you sure to delete all messages in this chat?"
            onConfirm={deleteChat}
            onClose={closeConfirmDialog}
          />
        );

      case 'block-user':
        return (
          <ConfirmDialog
            title="Block User"
            message="Are you sure to block the user?"
            onConfirm={blockUser}
            onClose={closeConfirmDialog}
          />
        );
    }
    return null;
  }, [confirmation, deleteChat, closeConfirmDialog, blockUser]);

  const menuItemsList = useMemo(() => {
    const menuItems: MenuItemDescriptor[] = [
      {
        icon: <DeleteIcon />,
        label: 'Delete Chat',
        action: startDeleteChatFlow,
      },
    ];

    if (isContact) {
      menuItems.push({
        icon: <RemoveContactIcon />,
        label: 'Remove contact',
        action: removeContact,
      });
    } else {
      menuItems.push({
        icon: <AddContactIcon />,
        label: 'Add contacts',
        action: addContact,
      });
    }

    if (isBlocked) {
      menuItems.push({
        icon: <UnblockUserIcon />,
        label: 'Unblock user',
        action: unblockUser,
      });
    } else {
      menuItems.push({
        icon: <BlockUserIcon />,
        label: 'Block user',
        action: startBlockUserFlow,
      });
    }

    return menuItems;
  }, [
    startDeleteChatFlow,
    isContact,
    isBlocked,
    addContact,
    startBlockUserFlow,
    removeContact,
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
      {activeConfirmDialogComponent}
    </>
  );
};

export default ChatContextMenu;
