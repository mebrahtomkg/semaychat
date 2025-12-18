import { FC } from 'react';
import {
  AvatarContainer,
  AvatarImage,
  AvatarInitials,
  AvatarStyled,
  OnlineIndicator,
} from './styles';
import gradientPalette from './gradientPalette';
import { useImageLoader } from '@/hooks';

interface AvatarProps {
  initials: string;
  itemIndex?: number;
  isOnline?: boolean;
  imageUrl?: string;
}

const Avatar: FC<AvatarProps> = ({
  initials,
  itemIndex = 0,
  isOnline,
  imageUrl,
}) => {
  const gradient = gradientPalette[itemIndex % gradientPalette.length];

  const { imageSrc, handleImageLoad, handleImageLoadError } =
    useImageLoader(imageUrl);

  return (
    <AvatarContainer>
      <AvatarStyled $gradient={gradient}>
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
