import { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { performSocketAuth } from './middlewares';
import registerMessageHandlers from './handlers/messageHandlers';
import { AuthenticatedSocket } from '@/types';
import { initEmitter } from './emitter';
import { isPositiveInteger } from '@/utils';
import { addSocketUser, removeSocketUser } from './socketUsers';
import { ALLOWED_ORIGINS } from '@/config/general';

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

    addSocketUser(userId, socket.id);

    socket.on('disconnect', () => {
      removeSocketUser(userId);
    });

    registerMessageHandlers(socket);
  });

  initEmitter(io);
};

export default initSocket;
