import { FC } from 'react';
import {
  MessageMetaStyled,
  ProgressText,
  TickIconContainer,
  Time,
} from './styles';
import { TickIcon } from '@/components/icons';

interface MessageMetaProps {
  isOutgoing: boolean;
  status: string | null;
  time: string;
}

const MessageMeta: FC<MessageMetaProps> = ({ isOutgoing, status, time }) => {
  return (
    <MessageMetaStyled onContextMenu={(e) => e.stopPropagation()}>
      {status ? (
        <ProgressText>{status}</ProgressText>
      ) : (
        <>
          <Time>{time}</Time>
          {isOutgoing && (
            <TickIconContainer>
              <TickIcon />
            </TickIconContainer>
          )}
        </>
      )}
    </MessageMetaStyled>
  );
};

export default MessageMeta;
