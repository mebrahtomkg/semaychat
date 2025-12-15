import { FC } from 'react';
import {
  MessageMetaStyled,
  ProgressText,
  TickIconContainer,
  Time,
} from './styles';
import { DoubleTickIcon, TickIcon } from '@/components/icons';
import { Message } from '@/types';
import { useMessageInfo } from '../../hooks';

interface MessageMetaProps {
  message: Message;
}

const MessageMeta: FC<MessageMetaProps> = ({ message }) => {
  const { status, time, isOutgoing, type } = useMessageInfo(message);

  const isImageOrVideo = type === 'photo' || type === 'video';

  return (
    <MessageMetaStyled onContextMenu={(e) => e.stopPropagation()}>
      {status ? (
        <ProgressText>{status}</ProgressText>
      ) : (
        <>
          <Time $isImageOrVideo={isImageOrVideo} $isOutgoing={isOutgoing}>
            {time}
          </Time>
          {isOutgoing && (
            <TickIconContainer>
              {message.isSeen ? <DoubleTickIcon /> : <TickIcon />}
            </TickIconContainer>
          )}
        </>
      )}
    </MessageMetaStyled>
  );
};

export default MessageMeta;
