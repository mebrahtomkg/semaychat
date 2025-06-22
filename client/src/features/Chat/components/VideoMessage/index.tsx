import { FC } from 'react';
import {
  VideoMessageStyled,
  VideoMetaContainer,
  VideoTagStyled
} from './styles';
import { MessageInfo } from '../../types';
import MessageMeta from '../MessageMeta';

interface VideoMessageProps {
  messageInfo: MessageInfo;
}

const VideoMessage: FC<VideoMessageProps> = ({ messageInfo }) => {
  const { isOutgoing, status, fileUrl, time } = messageInfo;

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
