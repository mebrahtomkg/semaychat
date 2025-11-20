import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';
import { emitToUser } from '@/socket/emitter';
import handleSocketError from '@/socket/handleSocketError';
import { markMessageAsRead } from '@/services';

interface MessageMarkAsReadPayload {
  chatPartnerId: number;
  messageId: number;
}

const handleMessageMarkAsRead = async (
  socket: AuthenticatedSocket,
  payload: MessageMarkAsReadPayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message mark as read payload.',
      });
    }

    const userId = socket.userId as number;

    const { chatPartnerId, messageId } = payload;

    if (!isPositiveInteger(chatPartnerId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid chat partner id.',
      });
    }

    if (!isPositiveInteger(messageId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message id.',
      });
    }

    await markMessageAsRead({
      userId,
      chatPartnerId,
      messageId,
    });

    acknowledgement({
      status: 'ok',
      message: 'Message marked as read successfully.',
    });

    emitToUser(chatPartnerId, 'message_read', {
      partnerId: userId,
      messageId,
    });
  } catch (error) {
    handleSocketError(error as Error, acknowledgement);
  }
};

export default handleMessageMarkAsRead;
