import { Socket } from 'socket.io-client';
import SocketResponseError from './SocketResponseError';

let socket: Socket;

export const initEmitter = (clientSocket: Socket) => {
  if (socket) throw Error('Emitter socket already initialized!');

  socket = clientSocket;
};

interface SocketResponse<Data> {
  status: 'ok' | 'error';
  message: string;
  data: Data;
}

export const emitWithAck = async <Result>(
  eventName: string,
  payload: unknown,
): Promise<Result> => {
  if (!socket) throw Error('Emitter socket not initialized!');

  // Delay for testing in dev
  // await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));

  const { status, message, data } = (await socket.emitWithAck(
    eventName,
    payload,
  )) as SocketResponse<Result>;

  if (status === 'error') {
    throw new SocketResponseError(message);
  }

  return data;
};
