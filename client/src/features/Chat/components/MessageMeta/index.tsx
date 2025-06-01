import React from 'react';
import {
  MessageMetaStyled,
  ProgressText,
  TickIconContainer,
  Time
} from './styles';
import { TickIcon } from '../../../../components/icons';

const MessageMeta = ({ isOutgoing, status, time }) => {
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
