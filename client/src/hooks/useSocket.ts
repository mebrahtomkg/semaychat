import { initSocket } from '@/services/socket';
import { useAppSelector } from '.';
import { useEffect } from 'react';

const useSocket = () => {
  const selfId = useAppSelector((state) => state.account?.id);

  useEffect(() => {
    if (selfId) initSocket();
  }, [selfId]);
};

export default useSocket;
