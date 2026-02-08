import {
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  ReplyIcon,
} from '@/components/icons';
import { FC, RefObject, useMemo, useRef } from 'react';
import {
  AudioMessage,
  FileMessage,
  PhotoMessage,
  TextMessage,
  VideoMessage,
} from '..';
import {
  MessageContainer,
  MessageIntersectionObserverTarget,
  MessageStyled,
} from './styles';
import { Message } from '@/types';
import { useMessageActions, useMessageInfo } from '../../hooks';
import useMarkMessageAsRead from './useMarkMessageAsRead';
import ParentMessage from '../ParentMessage';
import ContextMenu, {
  IMenuItem,
  MenuItem,
  useContextMenu,
} from '@/components/ContextMenu';
import {
  ANIMATION_CONTEXT_MENU_FAST,
  ANIMATION_DIALOG_FAST,
  WithAnimation,
} from '@/Animation';
import ConfirmDialog from '@/components/ConfirmDialog';
import CheckBox from '@/components/Checkbox';
import useDeleteMessage from './useDeleteMessage';

interface BaseMessageProps {
  message: Message;
  isLastInGroup: boolean;
  intersectionObserverRootRef: RefObject<HTMLDivElement | null>;
}

const BaseMessage: FC<BaseMessageProps> = ({
  message,
  isLastInGroup,
  intersectionObserverRootRef,
}) => {
  const messageInfo = useMessageInfo(message);
  const { type, isOutgoing } = messageInfo;
  const { edit, reply, downloadFile } = useMessageActions(message);

  const {
    openDeleteConfirm,
    isDeleteConfirmVisible,
    isDeleteForReceiver,
    toggleIsDeleteForReceiver,
    handleMessageDelete,
    closeDeleteConfirm,
  } = useDeleteMessage(message);

  const {
    isContextMenuVisible,
    handleContextMenu,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

  const menuItems = useMemo(() => {
    const items: IMenuItem[] = [
      <MenuItem
        key={'reply'}
        icon={<ReplyIcon />}
        label="Reply"
        action={reply}
        onClose={closeContextMenu}
      />,
    ];
    if (type === 'text' && isOutgoing) {
      items.push(
        <MenuItem
          key={'edit'}
          icon={<EditIcon />}
          label="Edit"
          action={edit}
          onClose={closeContextMenu}
        />,
      );
    }
    if (type !== 'text') {
      items.push(
        <MenuItem
          key={'save'}
          icon={<DownloadIcon />}
          label="Save"
          action={downloadFile}
          onClose={closeContextMenu}
        />,
      );
    }
    items.push(
      <MenuItem
        key={'delete'}
        icon={<DeleteIcon />}
        label="Delete"
        action={openDeleteConfirm}
        onClose={closeContextMenu}
      />,
    );
    return items;
  }, [
    reply,
    type,
    isOutgoing,
    edit,
    downloadFile,
    openDeleteConfirm,
    closeContextMenu,
  ]);

  const messageComponent = useMemo(() => {
    switch (type) {
      case 'text':
        return <TextMessage messageInfo={messageInfo} message={message} />;
      case 'photo':
        return <PhotoMessage messageInfo={messageInfo} message={message} />;
      case 'video':
        return <VideoMessage messageInfo={messageInfo} message={message} />;
      case 'audio':
        return (
          <AudioMessage
            messageInfo={messageInfo}
            message={message}
            onMoreButtonClick={handleMoreButtonClick}
          />
        );
      case 'file':
        return (
          <FileMessage
            onMoreButtonClick={handleMoreButtonClick}
            message={message}
          />
        );
    }
  }, [messageInfo, message, handleMoreButtonClick, type]);

  const intersectionObserverTargetRef = useRef<HTMLDivElement>(null);

  useMarkMessageAsRead(
    intersectionObserverTargetRef,
    intersectionObserverRootRef,
    message,
  );

  const handleMessageClick =
    type === 'audio' || type === 'file' || type === 'photo'
      ? undefined
      : handleContextMenu;

  const handleMessageContextMenu =
    type === 'audio' || type === 'file' ? undefined : handleContextMenu;

  return (
    <MessageStyled $isOutgoing={isOutgoing} $isLastInGroup={isLastInGroup}>
      <MessageContainer
        $isLastInGroup={isLastInGroup}
        $isOutgoing={isOutgoing}
        $messageType={type}
        onClick={handleMessageClick}
        onContextMenu={handleMessageContextMenu}
      >
        {message.parentMessage && (
          <ParentMessage
            message={message.parentMessage}
            isParentOfOutgoingMessage={isOutgoing}
          />
        )}

        {messageComponent}

        <WithAnimation
          isVisible={isContextMenuVisible}
          options={ANIMATION_CONTEXT_MENU_FAST}
          render={(style) => (
            <ContextMenu
              menuItems={menuItems}
              animationStyle={style}
              position={contextMenuPosition}
              onClose={closeContextMenu}
            />
          )}
        />

        <MessageIntersectionObserverTarget
          ref={intersectionObserverTargetRef}
        />
      </MessageContainer>

      <WithAnimation
        isVisible={isDeleteConfirmVisible}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => (
          <ConfirmDialog
            title="Delete message"
            message="Are you sure you want to delete this message?"
            onConfirm={handleMessageDelete}
            onClose={closeDeleteConfirm}
            animationStyle={style}
          >
            {isOutgoing && (
              <CheckBox
                label="Also delete for receiver"
                isChecked={isDeleteForReceiver}
                onToggle={toggleIsDeleteForReceiver}
              />
            )}
          </ConfirmDialog>
        )}
      />
    </MessageStyled>
  );
};

export default BaseMessage;
