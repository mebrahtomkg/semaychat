import { FC, useMemo } from 'react';
import { DeleteIcon, DownloadIcon, ReplyIcon } from '@/components/icons';
import {
  BackButton,
  MoreButton,
  NextButton,
  PreviousButton,
} from '@/components/buttons';
import {
  PhotoHeaderSection,
  PhotoIndexIndicator,
  PhotoMetaContainer,
  PhotoMetaText,
} from '@/styles';
import { LoadingError, PhotoViewerModal, ProgressContainer } from './styles';
import { usePhotoNavigation, useAccountInfo, useImageLoader } from '@/hooks';
import { isImage } from '../../utils';
import useUser from '@/hooks/useUserPro';
import {
  useChatMessages,
  useMessageActions,
  useMessageInfo,
} from '../../hooks';
import { getFileExtension } from '@/utils';
import { FlexibleImage } from '@/components';
import ContextMenu, {
  IMenuItem,
  MenuItem,
  useContextMenu,
} from '@/components/ContextMenu';
import { ANIMATION_CONTEXT_MENU_FAST, WithAnimation } from '@/Animation';

interface PhotoViewerProps {
  chatPartnerId: number;
  targetMessageId: number;
  onClose: () => void;
}

const PhotoViewer: FC<PhotoViewerProps> = ({
  chatPartnerId,
  targetMessageId,
  onClose,
}) => {
  const chatMessages = useChatMessages(chatPartnerId);

  const photoMessages = useMemo(
    () =>
      chatMessages.filter((message) =>
        isImage(getFileExtension(message.attachment?.name)),
      ),
    [chatMessages],
  );

  const {
    isContextMenuVisible,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

  const targetIndex = useMemo(() => {
    for (let i = 0; i < photoMessages.length; i++) {
      if (photoMessages[i].id === targetMessageId) return i;
    }
  }, [photoMessages, targetMessageId]);

  const photosCount = photoMessages.length;

  const { currentIndex, handleNext, handlePrevious, photoIndexIndicator } =
    usePhotoNavigation(photosCount, targetIndex);

  const { isOutgoing, dateTime, fileUrl } = useMessageInfo(
    photoMessages[currentIndex],
  );

  const { deleteMessage, downloadFile, reply } = useMessageActions(
    photoMessages[currentIndex],
  );

  const { isImageLoadError, handleImageLoad, handleImageLoadError } =
    useImageLoader(fileUrl);

  const options: IMenuItem[] = useMemo(
    () => [
      <MenuItem
        key={'reply'}
        icon={<ReplyIcon />}
        label="Reply"
        action={reply}
        onClose={closeContextMenu}
      />,
      <MenuItem
        key={'save'}
        icon={<DownloadIcon />}
        label="Save"
        action={downloadFile}
        onClose={closeContextMenu}
      />,
      <MenuItem
        key={'delete'}
        icon={<DeleteIcon />}
        label="Delete"
        action={deleteMessage}
        onClose={closeContextMenu}
      />,
    ],
    [reply, downloadFile, deleteMessage, closeContextMenu],
  );

  const { fullName: partnerFullName } = useUser(chatPartnerId);
  const { fullName: selfFullName } = useAccountInfo();
  const senderFullName = isOutgoing ? selfFullName : partnerFullName;

  return (
    <PhotoViewerModal aria-modal="true" aria-label="Photo Viewer">
      <PhotoHeaderSection>
        <BackButton aria-label="Back" onClick={onClose} />

        {photosCount > 1 && (
          <PhotoIndexIndicator>{photoIndexIndicator}</PhotoIndexIndicator>
        )}

        {options.length > 0 && (
          <MoreButton aria-label="Options" onClick={handleMoreButtonClick} />
        )}
      </PhotoHeaderSection>

      <FlexibleImage
        src={fileUrl}
        onLoad={handleImageLoad}
        onError={handleImageLoadError}
        alt="Message attachment"
        isPhotoNavTarget={true}
        onClick={onClose}
      />

      {isImageLoadError && (
        <ProgressContainer onClick={onClose} data-is-photo-nav-target="true">
          <LoadingError>Failed to load image!</LoadingError>
        </ProgressContainer>
      )}

      {photosCount > 1 && (
        <>
          <PreviousButton onClick={handlePrevious} />
          <NextButton onClick={handleNext} />
        </>
      )}

      {dateTime && (
        <PhotoMetaContainer>
          <PhotoMetaText>{senderFullName}</PhotoMetaText>
          <PhotoMetaText>{dateTime}</PhotoMetaText>
        </PhotoMetaContainer>
      )}

      <WithAnimation
        isVisible={isContextMenuVisible}
        options={ANIMATION_CONTEXT_MENU_FAST}
        render={(style) => (
          <ContextMenu
            menuItems={options}
            position={contextMenuPosition}
            onClose={closeContextMenu}
            animationStyle={style}
          />
        )}
      />
    </PhotoViewerModal>
  );
};

export default PhotoViewer;
