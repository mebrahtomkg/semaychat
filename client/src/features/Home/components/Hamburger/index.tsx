import { useAccountInfo, useImageLoader } from '@/hooks';
import {
  HamburgerContainer,
  HamburgerStyled,
  Name,
  NameInitial,
  ProfilePhoto,
  ProfilePhotoContainer,
} from './styles';
import { useCallback, useState } from 'react';
import Menu from '../Menu';
import { ANIMATION_DIALOG_FAST, WithAnimation } from '@/Animation';

const Hamburger = () => {
  const { fullName, nameInitials, photoUrl } = useAccountInfo();

  const { imageSrc, handleImageLoad, handleImageLoadError } =
    useImageLoader(photoUrl);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const openMenu = useCallback(() => setIsMenuVisible(true), []);
  const closeMenu = useCallback(() => setIsMenuVisible(false), []);

  return (
    <>
      <HamburgerContainer>
        <HamburgerStyled onClick={openMenu}>
          <ProfilePhotoContainer>
            {imageSrc ? (
              <ProfilePhoto
                src={imageSrc}
                onLoad={handleImageLoad}
                onError={handleImageLoadError}
              />
            ) : (
              <NameInitial>{nameInitials[0]}</NameInitial>
            )}
          </ProfilePhotoContainer>

          <Name>{fullName}</Name>
        </HamburgerStyled>
      </HamburgerContainer>

      <WithAnimation
        isVisible={isMenuVisible}
        options={ANIMATION_DIALOG_FAST}
        render={(style) => <Menu onClose={closeMenu} animationStyle={style} />}
      />
    </>
  );
};

export default Hamburger;
