import { Checkbox, ConfirmDialog } from '@/components';
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

  const [confirmation, setConfirmation] = useState<Confirmation>(null);
  const closeConfirmDialog = useCallback(() => setConfirmation(null), []);

  const [deleteForReceiver, setDeleteForReceiver] = useState(false);
  const toggleDeleteForReceiver = useCallback(
    () => setDeleteForReceiver((prevValue) => !prevValue),
    [],
  );

  const { isContact, isBlocked } = useUserInfo(chatPartner);

  const { blockUser } = useBlockUser(chatPartner);
  const { unblockUser } = useUnblockUser(chatPartner);
  const { addContact } = useAddContact(chatPartner);
  const { removeContact } = useRemoveContact(chatPartner);

  const deleteChat = useCallback(
    () =>
      addChatDeleteRequest({
        chatPartnerId: chatPartner.id,
        deleteForReceiver,
      }),
    [addChatDeleteRequest, chatPartner.id, deleteForReceiver],
  );

  const startDeleteChatFlow = useCallback(() => {
    setDeleteForReceiver(false);
    setConfirmation('delete-chat');
  }, []);

  const startBlockUserFlow = useCallback(
    () => setConfirmation('block-user'),
    [],
  );

  const deleteChatConfirmDialog = useMemo(
    () => (
      <ConfirmDialog
        title="Delete Chat"
        message="Are you sure to delete all messages in this chat?"
        onConfirm={deleteChat}
        onClose={closeConfirmDialog}
      >
        <Checkbox
          isChecked={deleteForReceiver}
          onToggle={toggleDeleteForReceiver}
          label="Also delete for receiver"
        />
      </ConfirmDialog>
    ),
    [
      deleteChat,
      closeConfirmDialog,
      deleteForReceiver,
      toggleDeleteForReceiver,
    ],
  );

  const blockUserConfirmDialog = useMemo(
    () => (
      <ConfirmDialog
        title="Block User"
        message="Are you sure to block the user?"
        onConfirm={blockUser}
        onClose={closeConfirmDialog}
      />
    ),
    [blockUser, closeConfirmDialog],
  );

  const activeConfirmDialogComponent = useMemo(() => {
    switch (confirmation) {
      case 'delete-chat':
        return deleteChatConfirmDialog;

      case 'block-user':
        return blockUserConfirmDialog;
    }
    return null;
  }, [confirmation, deleteChatConfirmDialog, blockUserConfirmDialog]);

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
