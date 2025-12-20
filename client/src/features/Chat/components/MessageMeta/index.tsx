import { FC } from 'react';
import {
  ClockIconContainer,
  MessageMetaStyled,
  TickIconContainer,
  Time,
} from './styles';
import { ClockIcon, DoubleTickIcon, TickIcon } from '@/components/icons';
import { Message } from '@/types';
import { useMessageInfo, useMessageStatus } from '../../hooks';

interface MessageMetaProps {
  message: Message;
}

const MessageMeta: FC<MessageMetaProps> = ({ message }) => {
  const { time, isOutgoing, type } = useMessageInfo(message);

  const status = useMessageStatus(message.id);

  const isImageOrVideo = type === 'photo' || type === 'video';

  return (
    <MessageMetaStyled onContextMenu={(e) => e.stopPropagation()}>
      <Time $isImageOrVideo={isImageOrVideo} $isOutgoing={isOutgoing}>
        {time}
      </Time>

      {isOutgoing &&
        (status === 'sending' || status === 'updating' ? (
          <ClockIconContainer>
            <ClockIcon />
          </ClockIconContainer>
        ) : (
          <TickIconContainer>
            {message.isSeen ? <DoubleTickIcon /> : <TickIcon />}
          </TickIconContainer>
        ))}
    </MessageMetaStyled>
  );
};

export default MessageMeta;
