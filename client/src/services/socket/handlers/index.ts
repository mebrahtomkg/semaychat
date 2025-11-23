import { Socket } from 'socket.io-client';
import handleMessageReceive from './handleMessageReceive';
import handleMessageUpdate from './handleMessageUpdate';
import handleMessageDelete from './handleMessageDelete';
import handleChatDelete from './handleChatDelete';
import handleMessageMarkAsRead from './handleMessageMarkAsRead';

export const registerHandlers = (socket: Socket) => {
  socket.on('message_received', handleMessageReceive);
  socket.on('message_updated', handleMessageUpdate);
  socket.on('message_deleted', handleMessageDelete);
  socket.on('chat_deleted', handleChatDelete);
  socket.on('message_marked_as_read', handleMessageMarkAsRead);
};
