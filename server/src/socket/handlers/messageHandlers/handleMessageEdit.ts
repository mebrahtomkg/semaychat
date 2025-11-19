import { editMessage } from '@/services';
import { MessageEditError } from '@/services/editMessage';
import { emitToUser } from '@/socket/emitter';
import handleSocketError from '@/socket/handleSocketError';
import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';

interface MessageEditPayload {
  messageId: number;
  content: string;
}

const handleMessageEdit = async (
  socket: AuthenticatedSocket,
  payload: MessageEditPayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message edit payload.',
      });
    }

    const { messageId, content } = payload;

    const userId = socket.userId as number;

    if (!isPositiveInteger(messageId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message id.',
      });
    }

    if (typeof content !== 'string') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message content.',
      });
    }

    const { shouldNotifyPartner, partnerId, updatedMessage } =
      await editMessage({ userId, messageId, content });

    acknowledgement({
      status: 'ok',
      message: 'Message updated successfully.',
      data: updatedMessage,
    });

    if (shouldNotifyPartner) {
      emitToUser(partnerId, 'message_updated', updatedMessage);
    }
  } catch (err) {
    if (err instanceof MessageEditError) {
      acknowledgement({
        status: 'error',
        message: err.message,
      });
    } else {
      handleSocketError(err as Error, acknowledgement);
    }
  }
};

export default handleMessageEdit;
