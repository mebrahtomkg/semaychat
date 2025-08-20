import { FC } from 'react';
import {
  ModalFooter,
  ModalHeader,
  PhotoUploaderModal,
  CropOverlayMask,
  CroppingViewport,
  LoadingText,
  LoadingTextContainer,
  PositionableImage,
} from './styles';
import Spinner from '../../../../Spinner';
import useImageCropper from './useImageCropper';
import ZoomSlider from './ZoomSlider';
import useProfilePhotoUploader from './useProfilePhotoUploader';
import { FullScreenOverlay, ModalTitle } from '../../../../styles';
import { CloseButton } from '../../../../components/buttons';
import ErrorBanner from '../ErrorBanner';
import UploadButton from '../UploadButton';

interface ProfilePhotoUploaderProps {
  file: File;
  onClose: () => void;
}

const ProfilePhotoUploader: FC<ProfilePhotoUploaderProps> = ({
  file,
  onClose,
}) => {
  const {
    croppingViewportRef,
    positionableImageRef,
    positionableImageStyle,
    handlePositionableImageLoad,
    isPositionableImageLoaded,
    handleMouseDownOnMask,
    handleTouchStartOnMask,
    adjustZoomOnWheelEvent,
    zoomPercentage,
    updateZoomPercentage,
    cropImage,
  } = useImageCropper();

  const { error, imageSrc, uploadPhoto, isUploading } = useProfilePhotoUploader(
    { file, onClose, imageCropperFunc: cropImage },
  );

  if (error) return <ErrorBanner error={error} onClose={onClose} />;

  if (!imageSrc) return null;

  return (
    <FullScreenOverlay $zIndex={300}>
      <PhotoUploaderModal aria-modal="true">
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
            onMouseDown={handleMouseDownOnMask}
            onTouchStart={handleTouchStartOnMask}
            onWheel={adjustZoomOnWheelEvent}
          />
          {!isPositionableImageLoaded && (
            <LoadingTextContainer>
              <LoadingText>Processing image...</LoadingText>
            </LoadingTextContainer>
          )}
          <PositionableImage
            ref={positionableImageRef}
            src={imageSrc}
            alt="Positionable profile photo"
            style={positionableImageStyle}
            draggable={false}
            onLoad={handlePositionableImageLoad}
          />
        </CroppingViewport>
        <ModalFooter>
          <ZoomSlider
            zoomPercentage={zoomPercentage}
            onZoomPercentageUpdate={updateZoomPercentage}
            onWheel={adjustZoomOnWheelEvent}
          />
          <UploadButton
            isDisabled={isUploading || !isPositionableImageLoaded}
            onClick={uploadPhoto}
          />
        </ModalFooter>
        {isUploading && <Spinner />}
      </PhotoUploaderModal>
    </FullScreenOverlay>
  );
};

export default ProfilePhotoUploader;
