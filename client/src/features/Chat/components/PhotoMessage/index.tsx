import { FC, useState } from 'react';
import { PhotoMessageStyled, PhotoImg, PhotoMetaContainer } from './styles';
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
    handleImageLoad: handleImageLoadFromFile
  } = useImageFileLoader(message.attachment?.file);

  const imageSrc = message.attachment?.file
    ? imageSrcFromFile
    : imageSrcFromUrl;

  const handleImageLoad = message.attachment?.file
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
