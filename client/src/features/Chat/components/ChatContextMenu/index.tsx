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
import { useSpinner } from '@/components/Spinner';
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

  const { isSpinnerVisible, showSpinner, hideSpinner } = useSpinner();

  const { isContact, isBlocked } = useUserInfo(chatPartner);

  const { addToContacts, abortAddToContacts } = useAddToContacts(chatPartner, {
    onStart: () => showSpinner(),
    onSuccess: () => hideSpinner(),
    onError: () => hideSpinner(),
  });

  const { removeContact, abortRemoveContact } = useRemoveContact(chatPartner, {
    onStart: () => showSpinner(),
    onSuccess: () => hideSpinner(),
    onError: () => hideSpinner(),
  });

  const { blockUser, abortBlockUser } = useBlockUser(chatPartner, {
    onStart: () => showSpinner(),
    onSuccess: () => hideSpinner(),
    onError: () => hideSpinner(),
  });

  const { unblockUser, abortUnblockUser } = useUnblockUser(chatPartner, {
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

  const handleOperationAbort = useCallback(() => {
    abortAddToContacts();
    abortRemoveContact();
    abortBlockUser();
    abortUnblockUser();
  }, [
    abortAddToContacts,
    abortRemoveContact,
    abortBlockUser,
    abortUnblockUser,
  ]);

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
      {isSpinnerVisible && <Spinner onCancelOperation={handleOperationAbort} />}
    </>
  );
};

export default ChatContextMenu;
