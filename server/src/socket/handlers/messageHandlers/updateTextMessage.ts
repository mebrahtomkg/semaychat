import { IS_PRODUCTION } from '@/constants';
import { Message } from '@/models';
import { emitToUser } from '@/socket/emitter';
import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';

interface TextMessageUpdatePayload {
  messageId: number;
  content: string;
}

const updateTextMessage = async (
  socket: AuthenticatedSocket,
  payload: TextMessageUpdatePayload,
  acknowledgement: Acknowledgement
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message info.'
      });
    }

    const { messageId } = payload;

    if (!isPositiveInteger(messageId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message id.'
      });
    }

    const message = await Message.findByPk(messageId);

    if (!message) {
      return acknowledgement({
        status: 'error',
        message: 'Message does not exist.'
      });
    }

    const userId = socket.userId;

    if (message.senderId !== userId) {
      return acknowledgement({
        status: 'error',
        message: 'You cannot edit this message.'
      });
    }

    if (message.attachment) {
      return acknowledgement({
        status: 'error',
        message: 'File message cannot be edited.'
      });
    }

    const content =
      typeof payload.content === 'string' ? payload.content.trim() : null;

    if (!content) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid message content.'
      });
      // Also Check content for xss security, filter it.
    }

    await Message.update(
      { content, editedAt: Date.now() },
      { where: { id: messageId } }
    );

    const updatedMessage = await Message.findByPk(messageId);

    acknowledgement({
      status: 'ok',
      message: 'Message updated successfully.',
      data: updatedMessage?.toJSON()
    });

    const isSentMessage = message.senderId === userId;

    const partnerId = isSentMessage ? message.receiverId : message.senderId;

    const isDeletedSoftlyByPartner = isSentMessage
      ? message.isDeletedByReceiver
      : message.isDeletedBySender;

    if (!isDeletedSoftlyByPartner) {
      emitToUser(partnerId, 'message_updated', updatedMessage?.toJSON());
    }
  } catch (err) {
    acknowledgement({
      status: 'error',
      message: IS_PRODUCTION
        ? 'INTERNAL SERVER ERROR'
        : `INTERNAL SERVER ERROR: ${(err as Error).toString()}  ${(err as Error).stack}`
    });
  }
};

export default updateTextMessage;
