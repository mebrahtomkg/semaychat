import { FC, useMemo } from 'react';
import ContextMenu, { useContextMenu } from '@/components/ContextMenu';
import { DeleteIcon, DownloadIcon, ReplyIcon } from '@/components/icons';
import {
  BackButton,
  MoreButton,
  NextButton,
  PreviousButton
} from '@/components/buttons';
import {
  PhotoHeaderSection,
  PhotoIndexIndicator,
  PhotoMetaContainer,
  PhotoMetaText
} from '@/styles';
import { PhotoViewerModal, ProgressContainer, ProgressText } from './styles';
import {
  useImageLoader,
  usePhotoNavigation,
  useAccount,
  useAppSelector
} from '@/hooks';
import TinySpinner from '@/components/TinySpinner';
import FlexibleImage from '@/components/FlexibleImage';
import { isImage } from '../../utils';
import useUser from '@/hooks/useUserPro';
import { useMessageActions, useMessageInfo } from '../../hooks';

interface PhotoViewerProps {
  chatPartnerId: number;
  targetMessageId: number;
  onClose: () => void;
}

const PhotoViewer: FC<PhotoViewerProps> = ({
  chatPartnerId,
  targetMessageId,
  onClose
}) => {
  const photoMessages = useAppSelector((state) =>
    state.messages.filter(
      (message) =>
        isImage(message.attachment?.extension) &&
        (message.senderId === chatPartnerId ||
          message.receiverId === chatPartnerId)
    )
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
    photoMessages[currentIndex]
  );

  const { deleteMessage, downloadFile, reply } = useMessageActions(
    photoMessages[currentIndex]
  );

  const { isImageFetching, isImageLoading, imageSrc, handleImageLoad } =
    useImageLoader(fileUrl);

  const options = useMemo(
    () => [
      { icon: <ReplyIcon />, label: 'Reply', action: reply },
      { icon: <DownloadIcon />, label: 'Save', action: downloadFile },
      { icon: <DeleteIcon />, label: 'Delete', action: deleteMessage }
    ],
    [reply, downloadFile, deleteMessage]
  );

  const { fullName: partnerFullName } = useUser(chatPartnerId);
  const { fullName: selfFullName } = useAccount();
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

      {isImageFetching && <TinySpinner />}

      {imageSrc ? (
        <FlexibleImage
          src={imageSrc}
          onLoad={handleImageLoad}
          alt="Photo"
          isBlur={isImageFetching || isImageLoading}
          isPhotoNavTarget={true}
          onClick={onClose}
        />
      ) : (
        <ProgressContainer>
          <ProgressText>Loading photo...</ProgressText>
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
