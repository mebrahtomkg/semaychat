import { IS_PRODUCTION } from '@/config/general';
import { Acknowledgement } from '@/types';

const handleSocketError = (error: Error, acknowledgement: Acknowledgement) => {
  console.error(error);

  acknowledgement({
    status: 'error',
    message: IS_PRODUCTION
      ? 'INTERNAL SERVER ERROR'
      : `INTERNAL SERVER ERROR: ${error.toString()}  ${error.stack}`,
  });
};

export default handleSocketError;
