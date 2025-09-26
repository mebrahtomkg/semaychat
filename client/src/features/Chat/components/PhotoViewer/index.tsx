import { FC, useMemo } from 'react';
import ContextMenu, { useContextMenu } from '@/components/ContextMenu';
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
import {
  usePhotoNavigation,
  useAccountInfo,
  useImageLoadProgress,
} from '@/hooks';
import { isImage } from '../../utils';
import useUser from '@/hooks/useUserPro';
import {
  useChatMessages,
  useMessageActions,
  useMessageInfo,
} from '../../hooks';
import { getFileExtension } from '@/utils';
import { FlexibleImage, ImageLoadingSpinner } from '@/components';

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

  const { isContextMenuVisible, onMoreButtonClick, contextMenuControlProps } =
    useContextMenu();

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

  const {
    isImageLoading,
    isImageLoadError,
    handleImageLoad,
    handleImageLoadError,
  } = useImageLoadProgress(fileUrl);

  const options = useMemo(
    () => [
      { icon: <ReplyIcon />, label: 'Reply', action: reply },
      { icon: <DownloadIcon />, label: 'Save', action: downloadFile },
      { icon: <DeleteIcon />, label: 'Delete', action: deleteMessage },
    ],
    [reply, downloadFile, deleteMessage],
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
          <MoreButton aria-label="Options" onClick={onMoreButtonClick} />
        )}
      </PhotoHeaderSection>

      <FlexibleImage
        src={fileUrl}
        onLoad={handleImageLoad}
        onError={handleImageLoadError}
        alt="Message attachment"
        isBlur={isImageLoading}
        isPhotoNavTarget={true}
        onClick={onClose}
      />

      {isImageLoading && (
        <ProgressContainer onClick={onClose} data-is-photo-nav-target="true">
          <ImageLoadingSpinner />
        </ProgressContainer>
      )}

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

      {isContextMenuVisible && (
        <ContextMenu
          menuItems={options}
          controlProps={contextMenuControlProps}
        />
      )}
    </PhotoViewerModal>
  );
};

export default PhotoViewer;
