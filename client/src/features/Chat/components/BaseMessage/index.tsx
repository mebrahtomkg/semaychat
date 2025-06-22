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
  PhotoMessage,
  TextMessage,
  VideoMessage
} from '..';
import MessageDeleteConfirmDialog from '../MessageDeleteConfirmDialog';
import { MessageContainer, MessageStyled } from './styles';
import { Message } from '@/types';
import { useMessageActions, useMessageInfo } from '../../hooks';

interface BaseMessageProps {
  message: Message;
  isLastInGroup: boolean;
}

const BaseMessage: FC<BaseMessageProps> = ({ message, isLastInGroup }) => {
  const messageInfo = useMessageInfo(message);

  const { type, isOutgoing } = messageInfo;

  const { edit, reply, downloadFile, deleteMessage } =
    useMessageActions(message);

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
        return <TextMessage messageInfo={messageInfo} message={message} />;
      case 'photo':
        return <PhotoMessage messageInfo={messageInfo} message={message} />;
      case 'video':
        return <VideoMessage messageInfo={messageInfo} />;
      case 'audio':
        return (
          <AudioMessage
            messageInfo={messageInfo}
            onMoreButtonClick={onMoreButtonClick}
          />
        );
      case 'file':
        return (
          <FileMessage
            messageInfo={messageInfo}
            onMoreButtonClick={onMoreButtonClick}
            message={message}
          />
        );
    }
  }, [messageInfo, message, onMoreButtonClick, type]);

  const onContextMenuFn =
    type === 'audio' || type === 'file' ? undefined : onContextMenu;

  return (
    <MessageStyled $isOutgoing={isOutgoing} $isLastInGroup={isLastInGroup}>
      <MessageContainer
        $shouldFlexGrow={type === 'audio' || type === 'file'}
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

export default BaseMessage;
