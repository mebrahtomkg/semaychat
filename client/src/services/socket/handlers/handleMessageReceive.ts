import { QUERY_KEY_MESSAGES } from '@/constants';
import queryClient from '@/queryClient';
import { Message } from '@/types';
import updateChatLastMessage from './updateChatLastMessage';

const handleMessageReceive = (message: Message) => {
  const partnerId = message.senderId;

  queryClient.setQueryData(
    [QUERY_KEY_MESSAGES, partnerId],
    (messages: Message[] | undefined) =>
      messages ? [...messages, message] : [message],
  );

  updateChatLastMessage(partnerId);

  //TODO: what about if new message is received from no chat list.
};

export default handleMessageReceive;
