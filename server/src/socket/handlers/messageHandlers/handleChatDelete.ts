import { Acknowledgement, AuthenticatedSocket } from '@/types';
import { isPositiveInteger } from '@/utils';
import { emitToUser } from '@/socket/emitter';
import { IS_PRODUCTION } from '@/config/general';
import { deleteChat } from '@/services';
import { ChatDeleteError } from '@/services/deleteChat';

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
  } catch (err) {
    if (err instanceof ChatDeleteError) {
      return acknowledgement({
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

export default handleChatDelete;
