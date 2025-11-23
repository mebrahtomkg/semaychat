import { FC } from 'react';
import {
  VideoMessageStyled,
  VideoMetaContainer,
  VideoTagStyled,
} from './styles';
import { MessageInfo } from '../../types';
import MessageMeta from '../MessageMeta';
import { Message } from '@/types';

interface VideoMessageProps {
  message: Message;
  messageInfo: MessageInfo;
}

const VideoMessage: FC<VideoMessageProps> = ({ messageInfo, message }) => {
  const { fileUrl } = messageInfo;

  return (
    <VideoMessageStyled>
      <VideoTagStyled controls width="250">
        <source src={fileUrl as string} type="video/mp4" />
        Sorry, your browser doesnot support embedded video
      </VideoTagStyled>

      <VideoMetaContainer>
        <MessageMeta message={message} />
      </VideoMetaContainer>
    </VideoMessageStyled>
  );
};

export default VideoMessage;
