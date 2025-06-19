import { FC } from 'react';
import {
  VideoMessageStyled,
  VideoMetaContainer,
  VideoTagStyled
} from './styles';
import MessageMeta from '../MessageMeta';
import { EnrichedMessage } from '../../types';

interface VideoMessageProps {
  enrichedMessage: EnrichedMessage;
}

const VideoMessage: FC<VideoMessageProps> = ({ enrichedMessage }) => {
  const { isOutgoing, status, fileUrl, time } = enrichedMessage;

  return (
    <VideoMessageStyled>
      <VideoTagStyled controls width="250">
        <source src={fileUrl} type="video/mp4" />
        Sorry, your browser doesnot support embedded video
      </VideoTagStyled>

      <VideoMetaContainer>
        <MessageMeta isOutgoing={isOutgoing} status={status} time={time} />
      </VideoMetaContainer>
    </VideoMessageStyled>
  );
};

export default VideoMessage;
