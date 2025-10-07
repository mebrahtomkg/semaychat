import {
  CSSProperties,
  FC,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react';
import ContextMenu, {
  MenuItemDescriptor,
  useContextMenu,
} from '@/components/ContextMenu';
import {
  BackButton,
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
  useAddContact,
  useBlockUser,
  useFullScreenPhoto,
  useImageLoader,
  usePhotoNavigation,
  useProfilePhoto,
  useRemoveContact,
  useUnblockUser,
  useUserInfo,
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
import { FlexibleImage, NameInitial, TinySpinner } from '@/components';
import useAnimationPro, { AnimationOptions } from '@/hooks/useAnimationPro';

interface ProfileBaseProps {
  user: User;
  onClose: (e: MouseEvent) => void;
  animationStyle?: CSSProperties;
}

const ProfileBase: FC<ProfileBaseProps> = ({
  user,
  onClose,
  animationStyle,
}) => {
  const { fullName, nameInitials, isBlocked, isContact } = useUserInfo(user);

  const { blockUser } = useBlockUser(user);
  const { unblockUser } = useUnblockUser(user);
  const { addContact } = useAddContact(user);
  const { removeContact } = useRemoveContact(user);

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

  const { isImageLoading, imageSrc, handleImageLoad } =
    useImageLoader(photoUrl);

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
          action: removeContact,
        });
      } else {
        items.push({
          icon: <AddContactIcon />,
          label: 'Add contact',
          action: addContact,
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
    removeContact,
    addContact,
    downloadPhoto,
  ]);

  const handleBackClick = (e: MouseEvent) => {
    if (isFullScreenMode) {
      exitFullScreenMode();
    } else {
      onClose(e);
    }
  };

  const handleOverlayClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      if (e.target === e.currentTarget) onClose(e);
    },
    [onClose],
  );

  return (
    <ProfileModalOverlay
      onClick={handleOverlayClick}
      style={{ ...animationStyle, transform: undefined }}
    >
      <ProfileModal style={animationStyle}>
        <ProfilePhotoStyled $isFullScreenMode={isFullScreenMode}>
          <PhotoHeaderSection>
            <BackButton onClick={handleBackClick} />

            {photosCount > 1 && (
              <PhotoIndexIndicator>{photoIndexIndicator}</PhotoIndexIndicator>
            )}

            <MoreButton onClick={onMoreButtonClick} />
          </PhotoHeaderSection>

          {isImageLoading && <TinySpinner />}

          {imageSrc ? (
            <FlexibleImage
              src={imageSrc}
              onLoad={handleImageLoad}
              alt="Profile Photo"
              isBlur={isImageLoading}
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

interface ProfileProps extends Omit<ProfileBaseProps, 'animationStyle'> {
  isVisible: boolean;
}

const Profile: FC<ProfileProps> = ({ isVisible, ...restProps }) => {
  const animationOptions = useMemo<AnimationOptions>(
    () => ({
      initialStyles: {
        opacity: '0.0',
        transform: 'scale(0.8)',
      },
      finalStyles: {
        opacity: '1.0',
        transform: 'scale(1.0)',
      },
      transition: {
        property: ['opacity', 'transform'],
        duration: [300, 300],
        timingFunction: ['ease-in-out', 'ease-in-out'],
      },
    }),
    [],
  );

  const { isMounted, animationStyle } = useAnimationPro(
    isVisible,
    animationOptions,
  );

  return (
    isMounted && <ProfileBase {...restProps} animationStyle={animationStyle} />
  );
};

export default Profile;
