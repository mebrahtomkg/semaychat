import { FC } from 'react';
import {
  MessageMetaStyled,
  ProgressText,
  TickIconContainer,
  Time,
} from './styles';
import { DoubleTickIcon, TickIcon } from '@/components/icons';

interface MessageMetaProps {
  isOutgoing: boolean;
  isSeen: boolean;
  status: string | null;
  time: string;
}

const MessageMeta: FC<MessageMetaProps> = ({
  isOutgoing,
  isSeen,
  status,
  time,
}) => {
  return (
    <MessageMetaStyled onContextMenu={(e) => e.stopPropagation()}>
      {status ? (
        <ProgressText>{status}</ProgressText>
      ) : (
        <>
          <Time>{time}</Time>
          {isOutgoing && (
            <TickIconContainer>
              {isSeen ? <DoubleTickIcon /> : <TickIcon />}
            </TickIconContainer>
          )}
        </>
      )}
    </MessageMetaStyled>
  );
};

export default MessageMeta;
