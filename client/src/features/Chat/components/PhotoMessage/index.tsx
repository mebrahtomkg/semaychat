import { FC, useState } from 'react';
import {
  PhotoMessageStyled,
  ImagePlaceholder,
  ImageStyled,
  ImageMetaContainer,
  LoadingProgress,
} from './styles';
import PhotoViewer from '../PhotoViewer';
import { useImageFileLoader, useImageLoader } from '@/hooks';
import MessageMeta from '../MessageMeta';
import { MessageInfo } from '../../types';
import { Message } from '@/types';

interface PhotoMessageProps {
  message: Message;
  messageInfo: MessageInfo;
}

const PhotoMessage: FC<PhotoMessageProps> = ({ message, messageInfo }) => {
  const { chatPartnerId, fileUrl, isOutgoing, status, time } = messageInfo;

  const [isPhotoViewerVisible, setIsPhotoViewerVisible] = useState(false);
  const openPhotoViewer = () => setIsPhotoViewerVisible(true);
  const closePhotoViewer = () => setIsPhotoViewerVisible(false);

  const { imageSrc: imageSrcFromUrl, handleImageLoad: handleImageLoadFromUrl } =
    useImageLoader(fileUrl);

  const {
    imageSrc: imageSrcFromFile,
    handleImageLoad: handleImageLoadFromFile,
  } = useImageFileLoader(message.attachment?.file);

  const imageSrc = message.attachment?.file
    ? imageSrcFromFile
    : imageSrcFromUrl;

  const handleImageLoad = message.attachment?.file
    ? handleImageLoadFromFile
    : handleImageLoadFromUrl;

  return (
    <PhotoMessageStyled>
      <ImageStyled
        width={message.attachment?.width || undefined}
        height={message.attachment?.height || undefined}
        src={imageSrc}
        alt="Photo"
        onLoad={handleImageLoad}
        onClick={openPhotoViewer}
      />

      {!imageSrc && (
        <ImagePlaceholder>
          <LoadingProgress>Loading...</LoadingProgress>
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
