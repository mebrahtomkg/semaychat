import { FC, useMemo } from 'react';
import {
  ModalFooter,
  ModalHeader,
  CropOverlayMask,
  CroppingViewport,
  LoadingText,
  LoadingTextContainer,
  PositionableImage,
  PhotoUploaderOverlay,
  PhotoUploaderStyled,
} from './styles';
import { Spinner } from '@/components';
import useImageCropper from './useImageCropper';
import ZoomSlider from './ZoomSlider';
import { ModalTitle } from '@/styles';
import { CloseButton } from '@/components/buttons';
import ErrorBanner from '../ErrorBanner';
import UploadButton from '../UploadButton';
import useZoomController from './useZoomController';
import usePhotoLoader from './usePhotoLoader';
import usePhotoUploader from './usePhotoUploader';

interface ProfilePhotoUploaderProps {
  file: File;
  onClose: () => void;
}

const ProfilePhotoUploader: FC<ProfilePhotoUploaderProps> = ({
  file,
  onClose,
}) => {
  const { imageWidth, zoomPercentage, updateZoomPercentage, handleWheel } =
    useZoomController();

  const {
    croppingViewportRef,
    imageRef,
    imagePosition,
    isImageDragging,
    handleImageLoad,
    isImageLoaded,
    handleMouseDown,
    handleTouchStart,
    cropImage,
  } = useImageCropper();

  const imageStyle = useMemo(
    () => ({
      transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
      width: `${imageWidth}%`,
      transition: !isImageDragging ? 'transform 0.7s ease-in-out' : 'none',
    }),
    [imagePosition.x, imagePosition.y, imageWidth, isImageDragging],
  );

  const { error: loadingError, imageSrc } = usePhotoLoader(file);

  const {
    error: uploadingError,
    uploadPhoto,
    isUploading,
  } = usePhotoUploader(cropImage, onClose, file.name);

  const error = loadingError || uploadingError;

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

        <CroppingViewport ref={croppingViewportRef}>
          <CropOverlayMask
            draggable={false}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
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
          />
        </CroppingViewport>

        <ModalFooter>
          <ZoomSlider
            zoomPercentage={zoomPercentage}
            onZoomPercentageUpdate={updateZoomPercentage}
            onWheel={handleWheel}
          />

          <UploadButton
            isDisabled={isUploading || !isImageLoaded}
            onClick={uploadPhoto}
          />
        </ModalFooter>

        {isUploading && <Spinner />}
      </PhotoUploaderStyled>
    </PhotoUploaderOverlay>
  );
};

export default ProfilePhotoUploader;
