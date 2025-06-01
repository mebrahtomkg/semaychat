import ContextMenu, { useContextMenu } from '@/components/ContextMenu';
import {
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  ReplyIcon
} from '@/components/icons';
import { FC, useCallback, useMemo, useState } from 'react';
import {
  AudioMessage,
  FileMessage,
  MessageTail,
  PhotoMessage,
  TextMessage,
  VideoMessage
} from '..';
import { useMessage } from '../../hooks';
import { EnrichedMessage, PendingMessage, PersistedMessage } from '../../types';
import MessageDeleteConfirmDialog from '../MessageDeleteConfirmDialog';
import { MessageContainer, MessageStyled } from './styles';

interface MessageProps {
  message: PersistedMessage | PendingMessage;
  isLastInGroup: boolean;
}

const Message: FC<MessageProps> = ({ message, isLastInGroup }) => {
  const enrichedMessage: EnrichedMessage = useMessage(message);

  const { type, isOutgoing, downloadFile, deleteMessage, edit, reply } =
    enrichedMessage;

  const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const openDeleteConfirm = useCallback(
    () => setDeleteConfirmVisible(true),
    []
  );

  const closeDeleteConfirm = useCallback(
    () => setDeleteConfirmVisible(false),
    []
  );

  const {
    isContextMenuVisible,
    onContextMenu,
    onMoreButtonClick,
    contextMenuControlProps
  } = useContextMenu();

  const contextMenuItems = useMemo(() => {
    const items = [{ icon: <ReplyIcon />, label: 'Reply', action: reply }];
    if (type === 'text' && isOutgoing) {
      items.push({ icon: <EditIcon />, label: 'Edit', action: edit });
    }
    if (type !== 'text') {
      items.push({
        icon: <DownloadIcon />,
        label: 'Save',
        action: downloadFile
      });
    }
    items.push({
      icon: <DeleteIcon />,
      label: 'Delete',
      action: openDeleteConfirm
    });
    return items;
  }, [reply, type, isOutgoing, edit, downloadFile, openDeleteConfirm]);

  const messageComponent = useMemo(() => {
    switch (type) {
      case 'text':
        return <TextMessage enrichedMessage={enrichedMessage} />;
      case 'photo':
        return <PhotoMessage enrichedMessage={enrichedMessage} />;
      case 'video':
        return <VideoMessage enrichedMessage={enrichedMessage} />;
      case 'audio':
        return (
          <AudioMessage
            enrichedMessage={enrichedMessage}
            onMoreButtonClick={onMoreButtonClick}
          />
        );
      case 'file':
        return (
          <FileMessage
            onMoreButtonClick={onMoreButtonClick}
            enrichedMessage={enrichedMessage}
          />
        );
    }
  }, [enrichedMessage, onMoreButtonClick, type]);

  const shouldRenderTail =
    type !== 'photo' && type !== 'video' && isLastInGroup;

  const onContextMenuFn =
    type === 'audio' || type === 'file' ? undefined : onContextMenu;

  return (
    <MessageStyled $isOutgoing={isOutgoing} $isLastInGroup={isLastInGroup}>
      <MessageContainer
        $isTransparentBackground={type === 'photo' || type === 'video'}
        $isLastInGroup={isLastInGroup}
        $isOutgoing={isOutgoing}
        onContextMenu={onContextMenuFn}
      >
        {messageComponent}

        {isContextMenuVisible && (
          <ContextMenu
            menuItems={contextMenuItems}
            controlProps={contextMenuControlProps}
          />
        )}
      </MessageContainer>

      {isDeleteConfirmVisible && (
        <MessageDeleteConfirmDialog
          isOutgoing={isOutgoing}
          onClose={closeDeleteConfirm}
          onDelete={deleteMessage}
        />
      )}
    </MessageStyled>
  );
};

export default Message;
