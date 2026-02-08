import { Message, MessageType } from '@/types';
import { FC } from 'react';
import { useMessageInfo } from '@/features/Chat/hooks';
import styled from 'styled-components';

const ContentPreview = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-secondary);
`;

const MessageTypeIndicator = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
  font-size: 1rem;
  font-weight: 500;
  color: var(--fg-action);
`;

const formattedMessageTypes: Record<MessageType, string> = {
  text: 'Text message',
  photo: 'Photo message',
  video: 'Video message',
  audio: 'Audio message',
  file: 'File message',
};

interface MessagePreviewProps {
  message: Message;
}

const MessagePreview: FC<MessagePreviewProps> = ({ message }) => {
  const { type } = useMessageInfo(message);

  return type === 'text' ? (
    <ContentPreview>{message.content}</ContentPreview>
  ) : (
    <MessageTypeIndicator>{formattedMessageTypes[type]}</MessageTypeIndicator>
  );
};

export default MessagePreview;
