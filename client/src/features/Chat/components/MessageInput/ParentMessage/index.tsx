import { CloseButton } from '@/components/buttons';
import { useAccountInfo, useUserInfo } from '@/hooks';
import { resetMessageInputState } from '@/store/useMessageInputStateStore';
import { Message, User } from '@/types';
import { FC } from 'react';
import {
  MessageContent,
  MessageDetails,
  MessageSender,
  ParentMessageStyled,
} from './styles';

interface ParentMessageProps {
  message: Message;
  chatPartner: User;
}

const ParentMessage: FC<ParentMessageProps> = ({ message, chatPartner }) => {
  const { fullName: partnerFullName } = useUserInfo(chatPartner);
  const { id: selfId, fullName: selfFullName } = useAccountInfo();

  const senderFullName =
    message.senderId === selfId ? selfFullName : partnerFullName;

  return (
    <ParentMessageStyled>
      <MessageDetails>
        <MessageSender>{senderFullName}</MessageSender>
        <MessageContent>{message.content}</MessageContent>
      </MessageDetails>

      <CloseButton onClick={resetMessageInputState} />
    </ParentMessageStyled>
  );
};

export default ParentMessage;
