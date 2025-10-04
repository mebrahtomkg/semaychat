import { ConfirmDialog, Spinner } from '@/components';
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
  useAddToContacts,
  useBlockUser,
  useRemoveContact,
  useUnblockUser,
  useUserInfo,
} from '@/hooks';
import { User } from '@/types';
import { FC, useCallback, useMemo, useState } from 'react';

interface ChatContextMenuProps {
  chatPartner: User;
}

const ChatContextMenu: FC<ChatContextMenuProps> = ({ chatPartner }) => {
  const { isContextMenuVisible, onMoreButtonClick, contextMenuControlProps } =
    useContextMenu();

  const [isSpinnerVisible, setIsSpinnerVisible] = useState(false);
  const showSpinner = useCallback(() => setIsSpinnerVisible(true), []);
  const hideSpinner = useCallback(() => setIsSpinnerVisible(false), []);

  const { isContact, isBlocked } = useUserInfo(chatPartner);

  const addToContacts = useAddToContacts(chatPartner, {
    onStart: () => showSpinner(),
    onSuccess: () => hideSpinner(),
    onError: () => hideSpinner(),
  });

  const removeContact = useRemoveContact(chatPartner, {
    onStart: () => showSpinner(),
    onSuccess: () => hideSpinner(),
    onError: () => hideSpinner(),
  });

  const blockUser = useBlockUser(chatPartner, {
    onStart: () => showSpinner(),
    onSuccess: () => hideSpinner(),
    onError: () => hideSpinner(),
  });

  const unblockUser = useUnblockUser(chatPartner, {
    onStart: () => showSpinner(),
    onSuccess: () => hideSpinner(),
    onError: () => hideSpinner(),
  });

  const deleteChat = useCallback(() => {}, []);

  type ActiveConfirmDialog =
    | 'delete-chat-confirm-dialog'
    | 'block-user-confirm-dialog'
    | null;

  const [activeConfirmDialog, setActiveConfirmDialog] =
    useState<ActiveConfirmDialog>(null);

  const closeConfirmDialog = useCallback(
    () => setActiveConfirmDialog(null),
    [],
  );

  const startDeleteChatFlow = useCallback(
    () => setActiveConfirmDialog('delete-chat-confirm-dialog'),
    [],
  );

  const startBlockUserFlow = useCallback(
    () => setActiveConfirmDialog('block-user-confirm-dialog'),
    [],
  );

  const activeConfirmDialogComponent = useMemo(() => {
    switch (activeConfirmDialog) {
      case 'delete-chat-confirm-dialog':
        return (
          <ConfirmDialog
            title="Delete Chat"
            message="Are you sure to delete all messages in this chat?"
            onConfirm={deleteChat}
            onClose={closeConfirmDialog}
          />
        );

      case 'block-user-confirm-dialog':
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
  }, [activeConfirmDialog, deleteChat, closeConfirmDialog, blockUser]);

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
        label: 'Remove From contacts',
        action: removeContact,
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
        action: startBlockUserFlow,
      });
    }

    return menuItems;
  }, [
    startDeleteChatFlow,
    isContact,
    isBlocked,
    addToContacts,
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
      {isSpinnerVisible && <Spinner />}
    </>
  );
};

export default ChatContextMenu;
