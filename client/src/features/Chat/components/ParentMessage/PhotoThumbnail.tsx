import { useImageLoader } from '@/hooks';
import { Message } from '@/types';
import { FC } from 'react';
import { useMessageInfo } from '../../hooks';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
`;

const ImageStyled = styled.img`
  margin-right: 0.5rem;
  max-width: 2.5rem;
  max-height: 2.5rem;
  width: auto;
  height: auto;
  border-radius: 5px;
`;

const ImagePlaceholder = styled.div`
  max-width: 100%;
  border-radius: inherit;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000000;
`;

interface PhotoThumbnailProps {
  message: Message;
}

const PhotoThumbnail: FC<PhotoThumbnailProps> = ({ message }) => {
  const { fileUrl } = useMessageInfo(message);

  const { imageSrc, isImageLoading, handleImageLoad, handleImageLoadError } =
    useImageLoader(fileUrl);

  return (
    <ImageContainer>
      <ImageStyled
        width={message.attachment?.width || undefined}
        height={message.attachment?.height || undefined}
        src={imageSrc}
        alt="Photo"
        onLoad={handleImageLoad}
        onError={handleImageLoadError}
      />

      {isImageLoading && <ImagePlaceholder>...</ImagePlaceholder>}
    </ImageContainer>
  );
};

export default PhotoThumbnail;
