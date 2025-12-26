import { ANIMATION_CONTEXT_MENU_FAST, WithAnimation } from '@/Animation';
import { Checkbox } from '@/components';
import { MoreButton } from '@/components/buttons';
import {
  AddContactIcon,
  BlockUserIcon,
  DeleteIcon,
  RemoveContactIcon,
  UnblockUserIcon,
} from '@/components/icons';
import ContextMenu, {
  IMenuItem,
  MenuItem,
  useContextMenu,
} from '@/components/ContextMenu';
import {
  useAddContact,
  useBlockUser,
  useRemoveContact,
  useUnblockUser,
  useUserInfo,
} from '@/hooks';
import { addChatDeleteRequest } from '@/store/useMessageRequestsStore';
import { User } from '@/types';
import { FC, useCallback, useMemo, useState } from 'react';
import ConfirmDialog from '@/components/ConfirmDialog';

interface ChatContextMenuProps {
  chatPartner: User;
}

type Confirmation = 'delete-chat' | 'block-user' | null;

const ChatContextMenu: FC<ChatContextMenuProps> = ({ chatPartner }) => {
  const {
    isContextMenuVisible,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

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
    [chatPartner.id, deleteForReceiver],
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
    const menuItems: IMenuItem[] = [
      <MenuItem
        key={'delete-chat'}
        icon={<DeleteIcon />}
        label="Delete Chat"
        action={startDeleteChatFlow}
        onClose={closeContextMenu}
      />,
    ];

    if (isContact) {
      menuItems.push(
        <MenuItem
          key={'remove-contact'}
          icon={<RemoveContactIcon />}
          label="Remove contact"
          action={removeContact}
          onClose={closeContextMenu}
        />,
      );
    } else {
      menuItems.push(
        <MenuItem
          key={'add-contact'}
          icon={<AddContactIcon />}
          label="Add contact"
          action={addContact}
          onClose={closeContextMenu}
        />,
      );
    }

    if (isBlocked) {
      menuItems.push(
        <MenuItem
          key={'unblock-user'}
          icon={<UnblockUserIcon />}
          label="Unblock user"
          action={unblockUser}
          onClose={closeContextMenu}
        />,
      );
    } else {
      menuItems.push(
        <MenuItem
          key={'block-user'}
          icon={<BlockUserIcon />}
          label="Block user"
          action={startBlockUserFlow}
          onClose={closeContextMenu}
        />,
      );
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
    closeContextMenu,
  ]);

  return (
    <>
      <MoreButton onClick={handleMoreButtonClick} />

      <WithAnimation
        isVisible={isContextMenuVisible}
        options={ANIMATION_CONTEXT_MENU_FAST}
        render={(style) => (
          <ContextMenu
            menuItems={menuItemsList}
            position={contextMenuPosition}
            onClose={closeContextMenu}
            animationStyle={style}
          />
        )}
      />

      {activeConfirmDialogComponent}
    </>
  );
};

export default ChatContextMenu;
