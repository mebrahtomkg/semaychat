import { isPositiveInteger } from '@/utils';
import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { emitToUser } from '@/socket/emitter';
import { sendMessage } from '@/services';
import { MessageSendError } from '@/services/sendMessage';
import handleSocketError from '@/socket/handleSocketError';

interface MessageSendPayload {
  receiverId: number;
  content: string;
  parentMessageId?: number;
}

const handleMessageSend = async (
  socket: AuthenticatedSocket,
  payload: MessageSendPayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message send payload.',
      });
    }

    const { receiverId, content, parentMessageId } = payload;

    const userId = socket.userId as number;

    if (!isPositiveInteger(receiverId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid receiver id.',
      });
    }

    if (typeof content !== 'string') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message content.',
      });
    }

    if (
      parentMessageId !== undefined &&
      !isPositiveInteger(payload.parentMessageId)
    ) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid parent message id.',
      });
    }

    const { message, sender } = await sendMessage({
      messageType: 'text',
      userId,
      receiverId,
      content,
      parentMessageId,
    });

    acknowledgement({
      status: 'ok',
      message: 'Message sent successfully!',
      data: message,
    });

    emitToUser(receiverId, 'message_received', { message, sender });
  } catch (err) {
    if (err instanceof MessageSendError) {
      acknowledgement({
        status: 'error',
        message: err.message,
      });
    } else {
      handleSocketError(err as Error, acknowledgement);
    }
  }
};

export default handleMessageSend;
