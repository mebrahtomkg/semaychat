import React, { FC } from 'react';
import { Content, HiddenMeta, TextMessageStyled, VisibleMeta } from './styles';
import MessageMeta from '../MessageMeta';
import { EnrichedMessage } from '../../types';

interface TextMessageProps {
  enrichedMessage: EnrichedMessage;
}

const TextMessage: FC<TextMessageProps> = ({ enrichedMessage }) => {
  const { content, isOutgoing, status, time } = enrichedMessage;

  return (
    <TextMessageStyled $isOutgoing={isOutgoing}>
      <Content>{content}</Content>
      <HiddenMeta>
        <MessageMeta isOutgoing={isOutgoing} status={status} time={time} />
      </HiddenMeta>

      <VisibleMeta>
        <MessageMeta isOutgoing={isOutgoing} status={status} time={time} />
      </VisibleMeta>
    </TextMessageStyled>
  );
};

export default TextMessage;
