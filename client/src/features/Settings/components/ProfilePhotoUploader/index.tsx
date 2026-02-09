import { FC, TouchEventHandler, useCallback, useMemo } from 'react';
import {
  ModalFooter,
  ModalHeader,
  CroppingViewport,
  LoadingText,
  LoadingTextContainer,
  PositionableImage,
  PhotoUploaderOverlay,
  PhotoUploaderStyled,
  CropOverlayMaskHole,
  CropOverlayMaskContainer,
  ModalTitle,
} from './styles';
import { Spinner } from '@/components';
import useImageCropper from './useImageCropper';
import ZoomSlider from './ZoomSlider';
import { CloseButton } from '@/components/buttons';
import ErrorBanner from '../ErrorBanner';
import UploadButton from '../UploadButton';
import useZoomController from './useZoomController';
import usePhotoLoader from './usePhotoLoader';
import usePhotoUploader from './usePhotoUploader';
import useImagePositioning from './useImagePositioning';
import { MaskIcon } from '@/components/icons';

interface ProfilePhotoUploaderProps {
  file: File;
  onClose: () => void;
}

const ProfilePhotoUploader: FC<ProfilePhotoUploaderProps> = ({
  file,
  onClose,
}) => {
  const {
    imageWidth,
    zoomPercentage,
    updateZoomPercentage,
    handleWheel,
    handleTouchStart: handleMultiTouchStart,
  } = useZoomController();

  const {
    croppingViewportRef,
    imageRef,
    imagePosition,
    isDraggingRef,
    recenterImage,
    handleMouseDown,
    handleTouchStart: handleSingleTouchStart,
  } = useImagePositioning();

  const {
    cropImage,
    isCropping,
    error: croppingError,
  } = useImageCropper({
    croppingViewportRef,
    imageRef,
    imagePosition,
  });

  const {
    imageSrc,
    handleImageLoad,
    isImageLoaded,
    handleImageLoadError,
    error: loadingError,
  } = usePhotoLoader(file, recenterImage);

  const {
    uploadPhoto,
    isUploading,
    error: uploadingError,
  } = usePhotoUploader({
    cropImage,
    onSuccess: onClose,
    fileName: file.name,
  });

  const imageStyle = useMemo(
    () => ({
      transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
      width: `${imageWidth}%`,
      transition: !isDraggingRef.current
        ? 'transform 0.7s ease-in-out'
        : 'none',
    }),
    [imagePosition.x, imagePosition.y, imageWidth, isDraggingRef.current],
  );

  const handleTouchStart: TouchEventHandler = useCallback(
    (e) => {
      if (e.touches.length > 1) {
        handleMultiTouchStart(e);
      } else {
        handleSingleTouchStart(e);
      }
    },
    [handleMultiTouchStart, handleSingleTouchStart],
  );

  const error = loadingError || croppingError || uploadingError;

  if (error) return <ErrorBanner error={error} onClose={onClose} />;

  if (!imageSrc) return null;

  return (
    <PhotoUploaderOverlay>
      <PhotoUploaderStyled aria-modal="true">
        <ModalHeader>
          <ModalTitle>Drag to reposition</ModalTitle>

          <CloseButton
            ariaLabel="Close Profile Photo Uploader"
            onClick={onClose}
          />
        </ModalHeader>

        <CroppingViewport
          ref={croppingViewportRef}
          onTouchStart={handleTouchStart}
        >
          <CropOverlayMaskContainer draggable={false}>
            <MaskIcon />
          </CropOverlayMaskContainer>

          <CropOverlayMaskHole
            draggable={false}
            onMouseDown={handleMouseDown}
            onWheel={handleWheel}
          />

          {!isImageLoaded && (
            <LoadingTextContainer>
              <LoadingText>Processing image...</LoadingText>
            </LoadingTextContainer>
          )}

          <PositionableImage
            ref={imageRef}
            src={imageSrc}
            alt="Positionable profile photo"
            style={imageStyle}
            draggable={false}
            onLoad={handleImageLoad}
            onError={handleImageLoadError}
          />
        </CroppingViewport>

        <ModalFooter>
          <ZoomSlider
            zoomPercentage={zoomPercentage}
            onZoomPercentageUpdate={updateZoomPercentage}
            onWheel={handleWheel}
          />

          <UploadButton
            isDisabled={!isImageLoaded || isCropping || isUploading}
            onClick={uploadPhoto}
          />
        </ModalFooter>

        {(isCropping || isUploading) && <Spinner onCancelOperation={onClose} />}
      </PhotoUploaderStyled>
    </PhotoUploaderOverlay>
  );
};

export default ProfilePhotoUploader;
