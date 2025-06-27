import initSocketService from '@/services/socketService';
import { useAppDispatch, useAppSelector } from '.';
import { useEffect } from 'react';

const useSocket = () => {
  const selfId = useAppSelector((state) => state.account?.id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selfId) initSocketService(dispatch);
  }, [selfId, dispatch]);
};

export default useSocket;
