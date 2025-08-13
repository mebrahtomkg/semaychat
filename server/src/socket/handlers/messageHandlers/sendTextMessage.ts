import commitSendingMessage from './commitSendingMessage';
import { isPositiveInteger } from '@/utils';
import sequelize from '@/config/db';
import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { emitToUser } from '@/socket/emitter';
import { IS_PRODUCTION } from '@/config/general';

interface TextMessageSendPayload {
  receiverId: number;
  content: string;
}

const sendTextMessage = async (
  socket: AuthenticatedSocket,
  payload: TextMessageSendPayload,
  acknowledgement: Acknowledgement
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message info.'
      });
    }

    const { receiverId } = payload;

    if (!isPositiveInteger(receiverId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid receiver id.'
      });
    }

    if (socket.userId === receiverId) {
      return acknowledgement({
        status: 'error',
        message: 'You cannot send message to yourself.'
      });
    }

    const content =
      typeof payload.content === 'string' ? payload.content.trim() : null;

    if (!content) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message content.'
      });
      //TODO: Check content for xss security, filter it.
    }

    const transaction = await sequelize.transaction();

    try {
      const { status, message, data } = await commitSendingMessage({
        transaction,
        senderId: socket.userId as number,
        receiverId,
        content
      });

      transaction.commit();

      acknowledgement({
        status: status === 200 ? 'ok' : 'error',
        message,
        data
      });

      if (status === 200) {
        emitToUser(receiverId, 'message_received', data);
      }
    } catch (err) {
      transaction.rollback();
      throw err;
    }
  } catch (error) {
    acknowledgement({
      status: 'error',
      message: IS_PRODUCTION
        ? 'INTERNAL SERVER ERROR'
        : `INTERNAL SERVER ERROR: ${(error as Error).toString()}  ${(error as Error).stack}`
    });
  }
};

export default sendTextMessage;
