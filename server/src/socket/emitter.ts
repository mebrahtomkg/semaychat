import { Server } from 'socket.io';
import { getSocketId } from './socketUsers';

let io: Server;

// This is done to avoid cyclic imports.
export const initEmitter = (server: Server) => {
  if (io) throw Error('Emitter already initialized!');

  io = server;
};

export const emitToUser = (
  userId: number,
  eventName: string,
  data: unknown
) => {
  if (!io) throw Error('Emitter not initialized!');

  const socketId = getSocketId(userId);

  if (socketId) {
    io.to(socketId).emit(eventName, data);
  }
};
