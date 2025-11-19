import sendTextMessage from './sendTextMessage';
import { AuthenticatedSocket } from '@/types';
import handleMessageDelete from './handleMessageDelete';
import handleChatDelete from './handleChatDelete';
import handleMessageEdit from './handleMessageEdit';

const registerMessageHandlers = (socket: AuthenticatedSocket) => {
  socket.on('send_text_message', (data, callback) => {
    sendTextMessage(socket, data, callback);
  });

  socket.on('update_text_message', (data, callback) => {
    handleMessageEdit(socket, data, callback);
  });

  socket.on('delete_message', (data, callback) => {
    handleMessageDelete(socket, data, callback);
  });

  socket.on('delete_chat', (data, callback) => {
    handleChatDelete(socket, data, callback);
  });
};

export default registerMessageHandlers;
