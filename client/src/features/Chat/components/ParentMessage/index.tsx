import { CloseButton } from '@/components/buttons';
import { useAccountInfo, useChats } from '@/hooks';
import { resetMessageInputState } from '@/store/useMessageInputStateStore';
import { Message } from '@/types';
import { FC } from 'react';
import {
  MessageContent,
  MessageDetails,
  MessageSender,
  ParentMessageStyled,
} from './styles';
import { useMessageInfo } from '../../hooks';
import { calculateFullName } from '@/utils';

interface ParentMessageProps {
  message: Message;
}

const ParentMessage: FC<ParentMessageProps> = ({ message }) => {
  const { chatPartnerId } = useMessageInfo(message);

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
    <ParentMessageStyled>
      <MessageSender>{senderFullName}</MessageSender>
      <MessageContent>{message.content}</MessageContent>
    </ParentMessageStyled>
  );
};

export default ParentMessage;
