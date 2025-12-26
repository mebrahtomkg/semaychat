import { useEffect, useMemo, useState } from 'react';
import {
  FetchingProgress,
  Name,
  NameInitial,
  NameInitialContainer,
  ProfilePhotoSettingsStyled,
  ProgressSpinner,
} from './styles';
import {
  PhotoHeaderSection,
  PhotoIndexIndicator,
  PhotoMetaContainer,
  PhotoMetaText,
} from '@/styles';
import { AddPhotoIcon, DeleteIcon, DownloadIcon } from '@/components/icons';
import { FlexibleImage, Spinner } from '@/components';
import ProfilePhotoUploader from '../ProfilePhotoUploader';
import {
  BackButton,
  MoreButton,
  NextButton,
  PreviousButton,
} from '@/components/buttons';
import {
  useFileSelector,
  useFullScreenPhoto,
  useImageLoader,
  usePhotoNavigation,
  useProfilePhotos,
  useAccountInfo,
} from '@/hooks';
import useSelfProfilePhoto from '../../hooks/useSelfProfilePhoto';
import AddPhotoButton from '../AddPhotoButton';
import ContextMenu, {
  IMenuItem,
  MenuItem,
  useContextMenu,
} from '@/components/ContextMenu';
import { ANIMATION_CONTEXT_MENU_FAST, WithAnimation } from '@/Animation';

const ProfilePhotoSettings = () => {
  const { fullName, nameInitials } = useAccountInfo();

  const {
    isContextMenuVisible,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

  const { isFullScreenMode, toggleFullScreenMode, exitFullScreenMode } =
    useFullScreenPhoto();

  const [isPhotoUploaderVisible, setIsPhotoUploaderVisible] = useState(false);
  const closePhotoUploader = () => setIsPhotoUploaderVisible(false);
  const openPhotoUploader = () => setIsPhotoUploaderVisible(true);

  const { fileInputRef, handleFileChange, triggerFileSelection, selectedFile } =
    useFileSelector(openPhotoUploader);

  const { profilePhotos } = useProfilePhotos();
  const photosCount = profilePhotos.length;

  const { currentIndex, handleNext, handlePrevious, photoIndexIndicator } =
    usePhotoNavigation(photosCount, 0, true);

  const {
    photoUrl,
    photoDateTime,
    isDoingRequest,
    downloadPhoto,
    deletePhoto,
  } = useSelfProfilePhoto(profilePhotos[currentIndex]);

  const { isImageLoading, imageSrc, handleImageLoad, handleImageLoadError } =
    useImageLoader(photoUrl);

  const options = useMemo(() => {
    const items: IMenuItem[] = [];
    if (!isFullScreenMode) {
      items.push(
        <MenuItem
          key={'set-profile-photo'}
          icon={<AddPhotoIcon />}
          label="Set Profile Photo"
          action={triggerFileSelection}
          onClose={closeContextMenu}
        />,
      );
    }
    if (imageSrc) {
      items.push(
        <MenuItem
          key={'save-photo'}
          icon={<DownloadIcon />}
          label="Save Photo"
          action={downloadPhoto}
          onClose={closeContextMenu}
        />,
        <MenuItem
          key={'delete'}
          icon={<DeleteIcon />}
          label="Delete"
          action={deletePhoto}
          onClose={closeContextMenu}
        />,
      );
    }
    return items;
  }, [
    isFullScreenMode,
    triggerFileSelection,
    imageSrc,
    downloadPhoto,
    deletePhoto,
    closeContextMenu,
  ]);

  useEffect(() => {
    if (isFullScreenMode && !photosCount) exitFullScreenMode();
  }, [photosCount, isFullScreenMode, exitFullScreenMode]);

  return (
    <ProfilePhotoSettingsStyled
      aria-modal={isFullScreenMode}
      aria-label="Profile photo settings"
      $isFullScreenMode={isFullScreenMode}
    >
      <PhotoHeaderSection>
        {isFullScreenMode ? (
          <BackButton
            aria-label="Exit fullscreen mode"
            onClick={exitFullScreenMode}
          />
        ) : (
          <div />
        )}

        {photosCount > 1 && (
          <PhotoIndexIndicator>{photoIndexIndicator}</PhotoIndexIndicator>
        )}

        {options.length > 0 && (
          <MoreButton
            aria-label="Open profile photo options"
            onClick={handleMoreButtonClick}
          />
        )}
      </PhotoHeaderSection>

      {isImageLoading && (
        <FetchingProgress>
          <ProgressSpinner />
        </FetchingProgress>
      )}

      {imageSrc ? (
        <FlexibleImage
          src={imageSrc}
          onLoad={handleImageLoad}
          onError={handleImageLoadError}
          alt="Profile Photo"
          isBlur={isImageLoading}
          onClick={toggleFullScreenMode}
          isPhotoNavTarget={true}
        />
      ) : (
        <NameInitialContainer>
          <NameInitial>{nameInitials}</NameInitial>
        </NameInitialContainer>
      )}

      {photosCount > 1 && (
        <>
          <PreviousButton onClick={handlePrevious} />
          <NextButton onClick={handleNext} />
        </>
      )}

      {!isFullScreenMode && (
        <>
          <Name>{fullName}</Name>
          <AddPhotoButton
            aria-label="Set profile photo"
            onClick={triggerFileSelection}
          />
        </>
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {isDoingRequest && <Spinner />}

      {isFullScreenMode && photoDateTime && (
        <PhotoMetaContainer>
          <PhotoMetaText>Profile Photo</PhotoMetaText>
          <PhotoMetaText>{photoDateTime}</PhotoMetaText>
        </PhotoMetaContainer>
      )}

      {isPhotoUploaderVisible && (
        <ProfilePhotoUploader
          file={selectedFile as unknown as File}
          onClose={closePhotoUploader}
        />
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
    </ProfilePhotoSettingsStyled>
  );
};

export default ProfilePhotoSettings;
