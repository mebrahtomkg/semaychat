import {
  CSSProperties,
  FC,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react';
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
import {
  ANIMATION_CONTEXT_MENU_FAST,
  useAnimation,
  WithAnimation,
} from '@/Animation';
import ContextMenu, {
  IMenuItem,
  MenuItem,
  useContextMenu,
} from '@/components/ContextMenu';

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

  const {
    isContextMenuVisible,
    handleMoreButtonClick,
    contextMenuPosition,
    closeContextMenu,
  } = useContextMenu();

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
    const items: IMenuItem[] = [];

    if (!isFullScreenMode) {
      if (isBlocked) {
        items.push(
          <MenuItem
            key={'unblock-user'}
            icon={<UnblockUserIcon />}
            label="Unblock user"
            action={unblockUser}
            onClose={closeContextMenu}
          />,
        );
      } else {
        items.push(
          <MenuItem
            key={'block-user'}
            icon={<BlockUserIcon />}
            label="Block user"
            action={blockUser}
            onClose={closeContextMenu}
          />,
        );
      }

      if (isContact) {
        items.push(
          <MenuItem
            key={'remove-contact'}
            icon={<RemoveContactIcon />}
            label="Remove contact"
            action={removeContact}
            onClose={closeContextMenu}
          />,
        );
      } else {
        items.push(
          <MenuItem
            key={'add-contact'}
            icon={<AddContactIcon />}
            label="Add contact"
            action={addContact}
            onClose={closeContextMenu}
          />,
        );
      }
    }

    if (imageSrc) {
      items.push(
        <MenuItem
          key={'download'}
          icon={<DownloadIcon />}
          label="Download"
          action={downloadPhoto}
          onClose={closeContextMenu}
        />,
      );
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
    closeContextMenu,
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

            <MoreButton onClick={handleMoreButtonClick} />
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
  const animationOptions = {
    initialStyles: {
      opacity: '0.0',
      transform: 'scale(0.3)',
    },
    finalStyles: {
      opacity: '1.0',
      transform: 'scale(0.99)',
    },
    transition: {
      property: ['opacity', 'transform'],
      duration: [300, 300],
      timingFunction: ['ease-in-out', 'ease-in-out'],
    },
  };

  const { isMounted, animationStyle } = useAnimation(
    isVisible,
    animationOptions,
  );

  return (
    isMounted && <ProfileBase {...restProps} animationStyle={animationStyle} />
  );
};

export default Profile;
