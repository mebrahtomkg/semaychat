import { io } from 'socket.io-client';
import { API_BASE_URL } from '@/constants';
import { registerHandlers } from './handlers';
import { initEmitter } from './emitter';

let isInitialized = false;

const initSocket = () => {
  if (isInitialized) throw Error('Socket already initialized!');
  isInitialized = true;

  const socket = io(API_BASE_URL.replace('/api', ''), {
    withCredentials: true,
  });

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  registerHandlers(socket);

  initEmitter(socket);
};

export default initSocket;
