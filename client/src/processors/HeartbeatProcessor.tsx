import { HEARTBEAT_INTERVAL_TIME } from '@/constants';
import { emitWithAck, SocketResponseError } from '@/services/socket';
import { Message } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

const HeartbeatProcessor = () => {
  const { mutate } = useMutation({
    mutationFn: () => {
      return emitWithAck<Message>('heartbeat', {});
    },
    retry: (_failureCount: number, error: Error) => {
      // No retry if the error is normal error sent from server
      if (error instanceof SocketResponseError) {
        return false;
      }
      return true;
    },
    onError(error) {
      console.error(error.message);
    },
    onSuccess: () => {
      // console.info('Heartbeat processed');
    },
  });

  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    intervalRef.current = setInterval(mutate, HEARTBEAT_INTERVAL_TIME);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [mutate]);

  return null;
};

export default HeartbeatProcessor;
