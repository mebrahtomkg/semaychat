import { CloseButton } from '@/components/buttons';
import { useAccountInfo, useUserInfo } from '@/hooks';
import { resetMessageInputState } from '@/store/useMessageInputStateStore';
import { Message, MessageType, User } from '@/types';
import { CSSProperties, FC } from 'react';
import {
  MessageContent,
  MessageDetails,
  MessageSender,
  MessageTypeIndicator,
  ParentMessageStyled,
} from './styles';
import { useMessageInfo } from '@/features/Chat/hooks';
import PhotoThumbnail from '../../PhotoThumbnail';

const formattedMessageTypes: Record<MessageType, string> = {
  text: 'Text',
  photo: 'Photo',
  video: 'Video',
  audio: 'Audio',
  file: 'File',
};

interface ParentMessageProps {
  message: Message;
  chatPartner: User;
  animationStyle?: CSSProperties;
}

const ParentMessage: FC<ParentMessageProps> = ({
  message,
  chatPartner,
  animationStyle,
}) => {
  const { fullName: partnerFullName } = useUserInfo(chatPartner);
  const { id: selfId, fullName: selfFullName } = useAccountInfo();

  const { content } = message;

  const { type } = useMessageInfo(message);

  const senderFullName =
    message.senderId === selfId ? selfFullName : partnerFullName;

  return (
    <ParentMessageStyled style={animationStyle}>
      <MessageDetails>
        {type === 'photo' && <PhotoThumbnail message={message} />}

        <div>
          <MessageSender>{senderFullName}</MessageSender>

          {content ? (
            <MessageContent>{content}</MessageContent>
          ) : (
            <MessageTypeIndicator>
              {formattedMessageTypes[type]}
            </MessageTypeIndicator>
          )}
        </div>
      </MessageDetails>

      <CloseButton onClick={resetMessageInputState} />
    </ParentMessageStyled>
  );
};

export default ParentMessage;
