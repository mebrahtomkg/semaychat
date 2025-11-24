import { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { performSocketAuth } from './middlewares';
import registerMessageHandlers from './handlers/messageHandlers';
import { AuthenticatedSocket } from '@/types';
import { initEmitter } from './emitter';
import { isPositiveInteger } from '@/utils';
import { ALLOWED_ORIGINS, SOCKET_USER_TIME_TO_LIVE } from '@/config/general';
import socketUsers from './socketUsers';

let isInitialized = false;

const initSocket = (httpServer: HttpServer) => {
  if (isInitialized) throw Error('Socket server already initialized!');
  isInitialized = true;

  const io = new Server(httpServer, {
    cors: {
      origin: ALLOWED_ORIGINS,
      credentials: true,
    },
  });

  io.use(performSocketAuth);

  io.on('connection', (socket: AuthenticatedSocket) => {
    const { userId } = socket;

    if (typeof userId !== 'number' || !isPositiveInteger(userId)) {
      return socket.disconnect(true);
    }

    socketUsers.set(userId, {
      socketId: socket.id,
      expiresAt: Date.now() + SOCKET_USER_TIME_TO_LIVE,
    });

    socket.on('heartbeat', () => {
      socketUsers.set(userId, {
        socketId: socket.id,
        expiresAt: Date.now() + SOCKET_USER_TIME_TO_LIVE,
      });
    });

    socket.on('disconnect', () => {
      socketUsers.del(userId);
    });

    registerMessageHandlers(socket);
  });

  initEmitter(io);
};

export default initSocket;
