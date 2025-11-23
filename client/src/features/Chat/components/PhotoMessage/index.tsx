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
import { useImageFileLoader, useImageLoader } from '@/hooks';
import MessageMeta from '../MessageMeta';
import { MessageInfo } from '../../types';
import { Message } from '@/types';
import { ImageLoadingSpinner } from '@/components';

interface PhotoMessageProps {
  message: Message;
  messageInfo: MessageInfo;
}

const PhotoMessage: FC<PhotoMessageProps> = ({ message, messageInfo }) => {
  const { chatPartnerId, fileUrl } = messageInfo;

  const [isPhotoViewerVisible, setIsPhotoViewerVisible] = useState(false);
  const openPhotoViewer = () => setIsPhotoViewerVisible(true);
  const closePhotoViewer = () => setIsPhotoViewerVisible(false);

  const {
    imageSrc: file_imageSrc,
    isImageLoading: file_isImageLoading,
    handleImageLoad: file_handleImageLoad,
  } = useImageFileLoader(message.attachment?.file);

  const {
    imageSrc: server_imageSrc,
    isImageLoading: server_isImageLoading,
    isImageLoadError: server_isImageLoadError,
    handleImageLoad: server_handleImageLoad,
    handleImageLoadError: server_handleImageLoadError,
  } = useImageLoader(fileUrl);

  const imageSrc = message.attachment?.file ? file_imageSrc : server_imageSrc;

  const invokeImageLoadHandlers = (e: SyntheticEvent<HTMLImageElement>) => {
    file_handleImageLoad(e);
    server_handleImageLoad(e);
  };

  return (
    <PhotoMessageStyled>
      <ImageStyled
        width={message.attachment?.width || undefined}
        height={message.attachment?.height || undefined}
        src={imageSrc}
        alt="Photo"
        onLoad={invokeImageLoadHandlers}
        onError={server_handleImageLoadError}
        onClick={openPhotoViewer}
      />

      {(file_isImageLoading ||
        server_isImageLoading ||
        server_isImageLoadError) && (
        <ImagePlaceholder>
          {file_isImageLoading ? (
            <LoadingProgress>Loading...</LoadingProgress>
          ) : server_isImageLoading ? (
            <ImageLoadingSpinner />
          ) : server_isImageLoadError ? (
            <LoadingError>Failed to load image!</LoadingError>
          ) : null}
        </ImagePlaceholder>
      )}

      <ImageMetaContainer>
        <MessageMeta message={message} />
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
