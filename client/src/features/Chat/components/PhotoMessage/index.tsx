import React, { FC, useState } from 'react';
import { PhotoMessageStyled, PhotoImg, PhotoMetaContainer } from './styles';
import PhotoViewer from '../PhotoViewer';
import { useImageFileLoader, useImageLoader } from '../../../../hooks';
import MessageMeta from '../MessageMeta';
import { EnrichedMessage } from '../../types';

interface PhotoMessageProps {
  enrichedMessage: EnrichedMessage;
}

const PhotoMessage: FC<PhotoMessageProps> = ({ enrichedMessage }) => {
  const { fileUrl, isOutgoing, status, time } = enrichedMessage;

  const [isPhotoViewerVisible, setIsPhotoViewerVisible] = useState(false);
  const openPhotoViewer = () => setIsPhotoViewerVisible(true);
  const closePhotoViewer = () => setIsPhotoViewerVisible(false);

  const { imageSrc: imageSrcFromUrl, handleImageLoad: handleImageLoadFromUrl } =
    useImageLoader(fileUrl);

  const {
    imageSrc: imageSrcFromFile,
    handleImageLoad: handleImageLoadFromFile
  } = useImageFileLoader(enrichedMessage.file);

  const imageSrc = enrichedMessage.file ? imageSrcFromFile : imageSrcFromUrl;

  const handleImageLoad = enrichedMessage.file
    ? handleImageLoadFromFile
    : handleImageLoadFromUrl;

  return (
    <PhotoMessageStyled>
      {imageSrc && (
        <PhotoImg
          src={imageSrc}
          alt="Photo"
          onLoad={handleImageLoad}
          onClick={openPhotoViewer}
        />
      )}
      <PhotoMetaContainer>
        <MessageMeta isOutgoing={isOutgoing} status={status} time={time} />
      </PhotoMetaContainer>

      {isPhotoViewerVisible && (
        <PhotoViewer photo={enrichedMessage} onClose={closePhotoViewer} />
      )}
    </PhotoMessageStyled>
  );
};

export default PhotoMessage;
