import { FC, MouseEvent, useMemo } from 'react';
import ContextMenu, {
  MenuItemDescriptor,
  useContextMenu,
} from '@/components/ContextMenu';
import FlexibleImage from '@/components/FlexibleImage';
import NameInitial from '@/components/NameInitial';
import TinySpinner from '@/components/TinySpinner';
import {
  BackButton,
  CloseButton,
  MoreButton,
  NextButton,
  PreviousButton,
} from '@/components/buttons';
import {
  AddContactIcon,
  BlockUserIcon,
  DownloadIcon,
  RemoveContactIcon,
  UnblockUserIcon,
} from '@/components/icons';
import {
  useFullScreenPhoto,
  useImageLoader,
  usePhotoNavigation,
  useProfilePhoto,
  useResponsive,
  useUser,
} from '@/hooks';
import {
  PhotoHeaderSection,
  PhotoIndexIndicator,
  PhotoMetaContainer,
  PhotoMetaText,
} from '@/styles';
import { User } from '@/types';
import {
  Name,
  ProfileModal,
  ProfileModalOverlay,
  ProfilePhotoStyled,
} from './styles';
import UserInfo from './UserInfo';
import useUserProfilePhotos from './useUserProfilePhotos';

interface ProfileProps {
  user: User;
  onClose: (e: MouseEvent) => void;
}

const Profile: FC<ProfileProps> = ({ user, onClose }) => {
  const { isLargeScreen, windowWidth } = useResponsive();

  const {
    fullName,
    nameInitials,
    isBlocked,
    isContact,
    blockUser,
    unblockUser,
    addToContacts,
    removeFromContacts,
  } = useUser(user);

  const { isContextMenuVisible, onMoreButtonClick, contextMenuControlProps } =
    useContextMenu();

  const { isFullScreenMode, toggleFullScreenMode, exitFullScreenMode } =
    useFullScreenPhoto();

  const profilePhotos = useUserProfilePhotos(user.id);
  const photosCount = profilePhotos?.length || 0;

  const { currentIndex, handleNext, handlePrevious, photoIndexIndicator } =
    usePhotoNavigation(photosCount);

  const { photoUrl, photoDateTime, downloadPhoto } = useProfilePhoto(
    profilePhotos[currentIndex],
  );

  const { isImageFetching, isImageLoading, imageSrc, handleImageLoad } =
    useImageLoader(photoUrl || null);

  const options = useMemo(() => {
    const items: MenuItemDescriptor[] = [];

    if (!isFullScreenMode) {
      if (isBlocked) {
        items.push({
          icon: <UnblockUserIcon />,
          label: 'Unblock user',
          action: unblockUser,
        });
      } else {
        items.push({
          icon: <BlockUserIcon />,
          label: 'Block user',
          action: blockUser,
        });
      }

      if (isContact) {
        items.push({
          icon: <RemoveContactIcon />,
          label: 'Remove contact',
          action: removeFromContacts,
        });
      } else {
        items.push({
          icon: <AddContactIcon />,
          label: 'Add contact',
          action: addToContacts,
        });
      }
    }

    if (imageSrc) {
      items.push({
        icon: <DownloadIcon />,
        label: 'Download',
        action: downloadPhoto,
      });
    }

    return items;
  }, [
    isFullScreenMode,
    imageSrc,
    isBlocked,
    isContact,
    unblockUser,
    blockUser,
    removeFromContacts,
    addToContacts,
    downloadPhoto,
  ]);

  const handleBackClick = (e: MouseEvent) => {
    if (isFullScreenMode) {
      exitFullScreenMode();
    } else {
      onClose(e);
    }
  };

  return (
    <ProfileModalOverlay>
      <ProfileModal>
        <ProfilePhotoStyled
          $isFullScreenMode={isFullScreenMode}
          $windowWidth={windowWidth}
        >
          <PhotoHeaderSection>
            {!isLargeScreen || isFullScreenMode ? (
              <BackButton onClick={handleBackClick} />
            ) : (
              <CloseButton onClick={handleBackClick} />
            )}

            {photosCount > 1 && (
              <PhotoIndexIndicator>{photoIndexIndicator}</PhotoIndexIndicator>
            )}

            <MoreButton onClick={onMoreButtonClick} />
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

          {!isFullScreenMode && <Name>{fullName}</Name>}

          {isFullScreenMode && photoDateTime && (
            <PhotoMetaContainer>
              <PhotoMetaText>{fullName} - profile photo</PhotoMetaText>
              <PhotoMetaText>{photoDateTime}</PhotoMetaText>
            </PhotoMetaContainer>
          )}

          {isContextMenuVisible && (
            <ContextMenu
              menuItems={options}
              controlProps={contextMenuControlProps}
            />
          )}
        </ProfilePhotoStyled>

        <UserInfo user={user} />
      </ProfileModal>
    </ProfileModalOverlay>
  );
};

export default Profile;
