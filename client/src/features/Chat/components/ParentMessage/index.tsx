import { useAccountInfo, useChats } from '@/hooks';
import { Message, MessageType } from '@/types';
import { FC } from 'react';
import {
  MessageContent,
  MessageSender,
  MessageTypeIndicator,
  ParentMessageStyled,
} from './styles';
import { useMessageInfo } from '../../hooks';
import { calculateFullName } from '@/utils';
import PhotoThumbnail from '../PhotoThumbnail';

const formattedMessageTypes: Record<MessageType, string> = {
  text: 'Text',
  photo: 'Photo',
  video: 'Video',
  audio: 'Audio',
  file: 'File',
};

interface ParentMessageProps {
  message: Message;
  isParentOfOutgoingMessage: boolean;
}

const ParentMessage: FC<ParentMessageProps> = ({
  message,
  isParentOfOutgoingMessage,
}) => {
  const { chatPartnerId, type } = useMessageInfo(message);

  const { content } = message;

  const chatPartner = useChats().find(
    (chat) => chat.partner.id === chatPartnerId,
  )?.partner;

  const { id: selfId, fullName: selfFullName } = useAccountInfo();

  if (!chatPartner) {
    return null;
  }

  const partnerFullName = calculateFullName(
    chatPartner.firstName,
    chatPartner.lastName,
  );

  const senderFullName =
    message.senderId === selfId ? selfFullName : partnerFullName;

  return (
    <ParentMessageStyled $isParentOfOutgoingMessage={isParentOfOutgoingMessage}>
      {type === 'photo' && <PhotoThumbnail message={message} />}

      <div>
        <MessageSender $isParentOfOutgoingMessage={isParentOfOutgoingMessage}>
          {senderFullName}
        </MessageSender>
        {content ? (
          <MessageContent>{content}</MessageContent>
        ) : (
          <MessageTypeIndicator
            $isParentOfOutgoingMessage={isParentOfOutgoingMessage}
          >
            {formattedMessageTypes[type]}
          </MessageTypeIndicator>
        )}
      </div>
    </ParentMessageStyled>
  );
};

export default ParentMessage;
