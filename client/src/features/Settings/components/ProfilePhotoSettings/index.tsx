import { useEffect, useMemo, useState } from 'react';
import { Name, ProfilePhotoSettingsStyled } from './styles';
import {
  PhotoHeaderSection,
  PhotoIndexIndicator,
  PhotoMetaContainer,
  PhotoMetaText,
} from '@/styles';
import { AddPhotoIcon, DeleteIcon, DownloadIcon } from '@/components/icons';
import { Spinner } from '@/components';
import ProfilePhotoUploader from '../ProfilePhotoUploader';
import ContextMenu, { useContextMenu } from '@/components/ContextMenu';
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
  useResponsive,
} from '@/hooks';
import useSelfProfilePhoto from '../../hooks/useSelfProfilePhoto';
import AddPhotoButton from '../AddPhotoButton';
import { MenuItemDescriptor } from '@/components/ContextMenu/types';
import TinySpinner from '@/components/TinySpinner';
import FlexibleImage from '@/components/FlexibleImage';
import NameInitial from '@/components/NameInitial';

const ProfilePhotoSettings = () => {
  const { windowWidth } = useResponsive();

  const { fullName, nameInitials } = useAccountInfo();

  const { isContextMenuVisible, onMoreButtonClick, contextMenuControlProps } =
    useContextMenu();

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

  const { isImageFetching, isImageLoading, imageSrc, handleImageLoad } =
    useImageLoader(photoUrl);

  const options = useMemo(() => {
    const items: MenuItemDescriptor[] = [];
    if (!isFullScreenMode) {
      items.push({
        icon: <AddPhotoIcon />,
        label: 'Set Profile Photo',
        action: triggerFileSelection,
      });
    }
    if (imageSrc) {
      items.push(
        { icon: <DownloadIcon />, label: 'Save Photo', action: downloadPhoto },
        { icon: <DeleteIcon />, label: 'Delete', action: deletePhoto },
      );
    }
    return items;
  }, [
    isFullScreenMode,
    triggerFileSelection,
    imageSrc,
    downloadPhoto,
    deletePhoto,
  ]);

  useEffect(() => {
    if (isFullScreenMode && !photosCount) exitFullScreenMode();
  }, [photosCount, isFullScreenMode, exitFullScreenMode]);

  return (
    <ProfilePhotoSettingsStyled
      aria-modal={isFullScreenMode}
      aria-label="Profile photo settings"
      $isFullScreenMode={isFullScreenMode}
      $windowWidth={windowWidth}
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
            onClick={onMoreButtonClick}
          />
        )}
      </PhotoHeaderSection>

      {isImageFetching && <TinySpinner />}

      {imageSrc ? (
        <FlexibleImage
          src={imageSrc}
          onLoad={handleImageLoad}
          alt="Profile Photo"
          isBlur={isImageFetching || isImageLoading}
          onClick={toggleFullScreenMode}
          isPhotoNavTarget={true}
        />
      ) : (
        <NameInitial nameInitials={nameInitials} />
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

      {isContextMenuVisible && (
        <ContextMenu
          menuItems={options}
          controlProps={contextMenuControlProps}
        />
      )}
    </ProfilePhotoSettingsStyled>
  );
};

export default ProfilePhotoSettings;
