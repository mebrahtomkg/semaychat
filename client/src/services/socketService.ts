import { io, Socket } from 'socket.io-client';
import { AppDispatch } from '@/store';
import {
  messageAdded,
  messageDeleted,
  messageUpdated
} from '@/features/Chat/slices/messagesSlice';
import { Message } from '@/types';

let socket: Socket;

const initSocketService = (dispatch: AppDispatch) => {
  if (socket) return;

  socket = io('http://localhost:3000', {
    withCredentials: true
  });

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket server');
  });

  socket.on('message_received', (message: Message) => {
    console.log('message_received', message);

    dispatch(messageAdded(message));
  });

  socket.on('message_updated', (message: Message) => {
    console.log('message_updated', message);

    dispatch(messageUpdated(message));
  });

  socket.on('message_deleted', (messageId: number) => {
    console.log('message_deleted', messageId);

    dispatch(messageDeleted(messageId));
  });
};

export default initSocketService;

interface SocketResponse<Data> {
  status: 'ok' | 'error';
  message: string;
  data?: Data;
}

export const emitWithAck = async <Result = unknown>(
  eventName: string,
  payload: unknown
): Promise<Result | undefined> => {
  if (!socket) throw Error('Socket not initialized!');

  const { status, message, data }: SocketResponse<Result> =
    await socket.emitWithAck(eventName, payload);

  console.log('api message', message);

  if (!(status === 'ok' || status === 'error'))
    throw Error('Connection issue!');

  return data;
};
