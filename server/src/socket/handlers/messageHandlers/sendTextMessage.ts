import { isPositiveInteger } from '@/utils';
import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { emitToUser } from '@/socket/emitter';
import { IS_PRODUCTION } from '@/config/general';
import { sendMessage } from '@/services';
import { MessageSendError } from '@/services/sendMessage';

interface TextMessageSendPayload {
  receiverId: number;
  content: string;
}

const sendTextMessage = async (
  socket: AuthenticatedSocket,
  payload: TextMessageSendPayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message payload.',
      });
    }

    const { receiverId } = payload;

    if (!isPositiveInteger(receiverId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid receiver id.',
      });
    }

    if (socket.userId === receiverId) {
      return acknowledgement({
        status: 'error',
        message: 'You cannot send message to yourself.',
      });
    }

    const content =
      typeof payload.content === 'string' ? payload.content.trim() : null;

    if (!content) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message content.',
      });
      //TODO: Check content for xss security, filter it.
    }

    const { message, sender } = await sendMessage({
      senderId: socket.userId as number,
      receiverId,
      content,
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
      const error = err as Error;
      console.error(error);
      acknowledgement({
        status: 'error',
        message: IS_PRODUCTION
          ? 'INTERNAL SERVER ERROR'
          : `INTERNAL SERVER ERROR: ${error.toString()}  ${error.stack}`,
      });
    }
  }
};

export default sendTextMessage;
