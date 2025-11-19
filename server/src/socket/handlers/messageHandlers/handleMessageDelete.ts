import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';
import { deleteMessage } from '@/services';
import { MessageDeleteError } from '@/services/deleteMessage';
import { emitToUser } from '@/socket/emitter';
import handleSocketError from '@/socket/handleSocketError';

interface MessageDeletePayload {
  messageId: number;
  deleteForReceiver?: boolean;
}

const handleMessageDelete = async (
  socket: AuthenticatedSocket,
  payload: MessageDeletePayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message delete payload.',
      });
    }

    const userId = socket.userId as number;

    const { messageId, deleteForReceiver } = payload;

    if (!isPositiveInteger(messageId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message id.',
      });
    }

    const { shouldNotifyPartner, partnerId } = await deleteMessage({
      userId,
      messageId,
      deleteForReceiver,
    });

    acknowledgement({
      status: 'ok',
      message: 'Message deleted successfully.',
    });

    if (shouldNotifyPartner) {
      emitToUser(partnerId, 'message_deleted', {
        partnerId: userId,
        messageId,
      });
    }
  } catch (err) {
    if (err instanceof MessageDeleteError) {
      acknowledgement({
        status: 'error',
        message: err.message,
      });
    } else {
      handleSocketError(err as Error, acknowledgement);
    }
  }
};

export default handleMessageDelete;
