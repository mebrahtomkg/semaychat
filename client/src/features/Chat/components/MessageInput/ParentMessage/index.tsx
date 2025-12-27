import { CloseButton } from '@/components/buttons';
import { useAccountInfo, useUserInfo } from '@/hooks';
import { resetMessageInputState } from '@/store/useMessageInputStateStore';
import { Message, User } from '@/types';
import { CSSProperties, FC } from 'react';
import {
  MessageContent,
  MessageDetails,
  MessageSender,
  ParentMessageStyled,
} from './styles';

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

  const senderFullName =
    message.senderId === selfId ? selfFullName : partnerFullName;

  return (
    <ParentMessageStyled style={animationStyle}>
      <MessageDetails>
        <MessageSender>{senderFullName}</MessageSender>
        <MessageContent>{message.content}</MessageContent>
      </MessageDetails>

      <CloseButton onClick={resetMessageInputState} />
    </ParentMessageStyled>
  );
};

export default ParentMessage;
