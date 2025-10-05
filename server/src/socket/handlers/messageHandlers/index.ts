import updateTextMessage from './updateTextMessage';
import deleteMessage from './deleteMessage';
import sendTextMessage from './sendTextMessage';
import { AuthenticatedSocket } from '@/types';
import deleteChat from './deleteChat';

const registerMessageHandlers = (socket: AuthenticatedSocket) => {
  socket.on('send_text_message', (data, callback) => {
    sendTextMessage(socket, data, callback);
  });

  socket.on('update_text_message', (data, callback) => {
    updateTextMessage(socket, data, callback);
  });

  socket.on('delete_message', (data, callback) => {
    deleteMessage(socket, data, callback);
  });

  socket.on('delete_chat', (data, callback) => {
    deleteChat(socket, data, callback);
  });
};

export default registerMessageHandlers;
