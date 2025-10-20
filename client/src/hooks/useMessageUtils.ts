import { Message } from '@/types';
import { useCallback } from 'react';
import useAccount from './useAccount';

const useMessageUtils = () => {
  const { id } = useAccount();

  const getMessagePartnerId = useCallback(
    (message: Message) =>
      message.senderId === id ? message.receiverId : message.senderId,
    [id],
  );

  return { getMessagePartnerId };
};

export default useMessageUtils;
