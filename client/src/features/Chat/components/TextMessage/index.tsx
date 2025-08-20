import { FC } from 'react';
import { Content, HiddenMeta, TextMessageStyled, VisibleMeta } from './styles';
import MessageMeta from '../MessageMeta';
import { Message } from '@/types';
import { MessageInfo } from '../../types';
import { useMessageContent } from '../../hooks';

interface TextMessageProps {
  message: Message;
  messageInfo: MessageInfo;
}

const TextMessage: FC<TextMessageProps> = ({ message, messageInfo }) => {
  const { isOutgoing, status, time } = messageInfo;

  const content = useMessageContent(message.id, message.content);

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
