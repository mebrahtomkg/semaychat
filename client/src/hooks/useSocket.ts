import { initSocket } from '@/services/socket';
import { useAccountQuery } from '.';
import { useEffect } from 'react';

const useSocket = () => {
  const { account } = useAccountQuery();

  useEffect(() => {
    if (account?.id) initSocket();
  }, [account?.id]);
};

export default useSocket;
