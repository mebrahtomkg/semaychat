import React, { useMemo } from 'react';
import ContextMenu, {
  useContextMenu
} from '../../../../components/ContextMenu';
import usePhotoSelector from './usePhotoSelector';
import {
  DeleteIcon,
  DownloadIcon,
  ReplyIcon
} from '../../../../components/icons';
import {
  BackButton,
  MoreButton,
  NextButton,
  PreviousButton
} from '../../../../components/buttons';
import {
  PhotoHeaderSection,
  PhotoIndexIndicator,
  PhotoMetaContainer,
  PhotoMetaText
} from '../../../../styles';
import { PhotoViewerModal, ProgressContainer, ProgressText } from './styles';
import {
  useImageLoader,
  usePhotoNavigation,
  useAccount,
  useUser
} from '../../../../hooks';
import useMessage from '../../hooks/useMessage';
import Spinner from '../../../../Spinner';
import TinySpinner from '../../../../components/TinySpinner';
import FlexibleImage from '../../../../components/FlexibleImage';

const PhotoViewer = ({ photo, onClose }) => {
  const { isContextMenuVisible, onMoreButtonClick, contextMenuControlProps } =
    useContextMenu();

  const { photos, targetIndex } = usePhotoSelector(photo);

  const photosCount = photos.length;

  const { currentIndex, handleNext, handlePrevious, photoIndexIndicator } =
    usePhotoNavigation(photosCount, targetIndex);

  const {
    isSentMessage,
    messagePartnerId,
    dateTime,
    fileUrl,
    isDoingRequest,
    deleteMessage,
    downloadFile
  } = useMessage(photos[currentIndex]);

  const { isImageFetching, isImageLoading, imageSrc, handleImageLoad } =
    useImageLoader(fileUrl);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const reply = () => console.error('Reply not implemented');

  const options = useMemo(
    () => [
      { icon: <ReplyIcon />, label: 'Reply', action: reply },
      { icon: <DownloadIcon />, label: 'Save', action: downloadFile },
      { icon: <DeleteIcon />, label: 'Delete', action: deleteMessage }
    ],
    [reply, downloadFile, deleteMessage]
  );

  const { fullName: partnerFullName } = useUser(messagePartnerId);
  const { fullName: selfFullName } = useAccount();
  const senderFullName = isSentMessage ? selfFullName : partnerFullName;

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

      {isDoingRequest && <Spinner />}

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
