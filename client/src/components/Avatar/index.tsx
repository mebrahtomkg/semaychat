import { FC } from 'react';
import {
  AvatarContainer,
  AvatarImage,
  AvatarInitials,
  AvatarStyled,
  OnlineIndicator,
} from './styles';
import { useImageLoader } from '@/hooks';
import { AVATAR_VARIANTS_COUNT } from '@/constants';

interface AvatarProps {
  initials: string;
  itemIndex?: number;
  isOnline?: boolean;
  imageUrl?: string;
  isSmall?: boolean;
}

const Avatar: FC<AvatarProps> = ({
  initials,
  itemIndex = 0,
  isOnline,
  imageUrl,
  isSmall = false,
}) => {
  const variantIndex = itemIndex % AVATAR_VARIANTS_COUNT;

  const { imageSrc, handleImageLoad, handleImageLoadError } =
    useImageLoader(imageUrl);

  return (
    <AvatarContainer>
      <AvatarStyled $isSmall={isSmall} $variantIndex={variantIndex}>
        {imageSrc ? (
          <AvatarImage
            src={imageSrc}
            onLoad={handleImageLoad}
            onError={handleImageLoadError}
            alt={initials || 'User Avatar'}
          />
        ) : (
          <AvatarInitials>{initials}</AvatarInitials>
        )}
      </AvatarStyled>

      {isOnline && <OnlineIndicator />}
    </AvatarContainer>
  );
};

export default Avatar;
