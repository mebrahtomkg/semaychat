import {
  ANIMATION_CONTEXT_MENU_FAST,
  ANIMATION_DIALOG_FAST,
  WithAnimation,
} from '@/Animation';
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
import CheckBox from '@/components/Checkbox';

type ActiveConfirmDialog = 'delete-chat' | 'block-user' | 'none';

interface ChatContextMenuProps {
  chatPartner: User;
}

const ChatContextMenu: FC<ChatContextMenuProps> = ({ chatPartner }) => {
  const {
    isContextMenuVisible,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

  const [activeConfirmDialog, setActiveConfirmDialog] =
    useState<ActiveConfirmDialog>('none');

  const closeConfirmDialog = useCallback(
    () => setActiveConfirmDialog('none'),
    [],
  );

  const [isDeleteForReceiver, setIsDeleteForReceiver] = useState(false);

  const toggleIsDeleteForReceiver = useCallback(
    () => setIsDeleteForReceiver((prevValue) => !prevValue),
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
        deleteForReceiver: isDeleteForReceiver,
      }),
    [chatPartner.id, isDeleteForReceiver],
  );

  const startDeleteChatFlow = useCallback(() => {
    setIsDeleteForReceiver(false);
    setActiveConfirmDialog('delete-chat');
  }, []);

  const startBlockUserFlow = useCallback(
    () => setActiveConfirmDialog('block-user'),
    [],
  );

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

      <WithAnimation
        isVisible={activeConfirmDialog === 'delete-chat'}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => (
          <ConfirmDialog
            title="Delete Chat"
            message="Are you sure to delete all messages in this chat?"
            onConfirm={deleteChat}
            onClose={closeConfirmDialog}
            animationStyle={style}
          >
            <CheckBox
              isChecked={isDeleteForReceiver}
              onToggle={toggleIsDeleteForReceiver}
              label="Also delete for receiver"
            />
          </ConfirmDialog>
        )}
      />

      <WithAnimation
        isVisible={activeConfirmDialog === 'block-user'}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => (
          <ConfirmDialog
            title="Block User"
            message="Are you sure to block the user?"
            onConfirm={blockUser}
            onClose={closeConfirmDialog}
            animationStyle={style}
          />
        )}
      />
    </>
  );
};

export default ChatContextMenu;
