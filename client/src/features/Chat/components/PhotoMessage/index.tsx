import { FC, SyntheticEvent, useState } from 'react';
import {
  PhotoMessageStyled,
  ImagePlaceholder,
  ImageStyled,
  ImageMetaContainer,
  LoadingProgress,
  LoadingError,
} from './styles';
import PhotoViewer from '../PhotoViewer';
import { useImageFileLoader, useImageLoadProgress } from '@/hooks';
import MessageMeta from '../MessageMeta';
import { MessageInfo } from '../../types';
import { Message } from '@/types';
import { ImageLoadingSpinner } from '@/components';

interface PhotoMessageProps {
  message: Message;
  messageInfo: MessageInfo;
}

const PhotoMessage: FC<PhotoMessageProps> = ({ message, messageInfo }) => {
  const { chatPartnerId, fileUrl, isOutgoing, status, time } = messageInfo;

  const [isPhotoViewerVisible, setIsPhotoViewerVisible] = useState(false);
  const openPhotoViewer = () => setIsPhotoViewerVisible(true);
  const closePhotoViewer = () => setIsPhotoViewerVisible(false);

  const {
    imageSrc: imageSrcFromFile,
    isImageLoading: isImageLoadingFromFile,
    handleImageLoad: handleImageLoadFromFile,
  } = useImageFileLoader(message.attachment?.file);

  const imageSrc = message.attachment?.file ? imageSrcFromFile : fileUrl;

  const {
    isImageLoading,
    isImageLoadError,
    handleImageLoad,
    handleImageLoadError,
  } = useImageLoadProgress(imageSrc);

  const invokeImageLoadHandlers = (e: SyntheticEvent<HTMLImageElement>) => {
    handleImageLoadFromFile(e);
    handleImageLoad(e);
  };

  return (
    <PhotoMessageStyled>
      <ImageStyled
        width={message.attachment?.width || undefined}
        height={message.attachment?.height || undefined}
        src={imageSrc}
        alt="Photo"
        onLoad={invokeImageLoadHandlers}
        onError={handleImageLoadError}
        onClick={openPhotoViewer}
      />

      {(isImageLoadingFromFile || isImageLoading || isImageLoadError) && (
        <ImagePlaceholder>
          {isImageLoadingFromFile ? (
            <LoadingProgress>Loading...</LoadingProgress>
          ) : isImageLoading ? (
            <ImageLoadingSpinner />
          ) : isImageLoadError ? (
            <LoadingError>Failed to load image!</LoadingError>
          ) : null}
        </ImagePlaceholder>
      )}

      <ImageMetaContainer>
        <MessageMeta isOutgoing={isOutgoing} status={status} time={time} />
      </ImageMetaContainer>

      {isPhotoViewerVisible && (
        <PhotoViewer
          chatPartnerId={chatPartnerId}
          targetMessageId={message.id}
          onClose={closePhotoViewer}
        />
      )}
    </PhotoMessageStyled>
  );
};

export default PhotoMessage;
