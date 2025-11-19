import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';
import { emitToUser } from '@/socket/emitter';
import { deleteChat } from '@/services';
import { ChatDeleteError } from '@/services/deleteChat';
import handleSocketError from '@/socket/handleSocketError';

interface ChatDeletePayload {
  chatPartnerId: number;
  deleteForReceiver?: boolean;
}

const handleChatDelete = async (
  socket: AuthenticatedSocket,
  payload: ChatDeletePayload,
  acknowledgement: Acknowledgement,
) => {
  try {
    if (!payload || typeof payload !== 'object') {
      return acknowledgement({
        status: 'error',
        message: 'Invalid chat delete payload.',
      });
    }

    const userId = socket.userId as number;
    const { chatPartnerId, deleteForReceiver } = payload;

    if (!isPositiveInteger(chatPartnerId)) {
      return acknowledgement({
        status: 'error',
        message: 'Invalid chat partner id.',
      });
    }

    await deleteChat({
      userId,
      partnerId: chatPartnerId,
      deleteForReceiver,
    });

    acknowledgement({
      status: 'ok',
      message: 'Chat deleted successfully.',
    });

    if (deleteForReceiver) {
      emitToUser(chatPartnerId, 'chat_deleted', {
        partnerId: userId,
        partnerMessagesDeleted: deleteForReceiver,
      });
    }
  } catch (error) {
    if (error instanceof ChatDeleteError) {
      acknowledgement({
        status: 'error',
        message: error.message,
      });
    } else {
      handleSocketError(error as Error, acknowledgement);
    }
  }
};

export default handleChatDelete;
