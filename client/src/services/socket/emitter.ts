import { Socket } from 'socket.io-client';

let socket: Socket;

export const initEmitter = (clientSocket: Socket) => {
  if (socket) throw Error('Emitter socket already initialized!');

  socket = clientSocket;
};

interface SocketResponse<Data> {
  status: 'ok' | 'error';
  message: string;
  data?: Data;
}

export const emitWithAck = async <Result = unknown>(
  eventName: string,
  payload: unknown,
): Promise<Result | undefined> => {
  if (!socket) throw Error('Emitter socket not initialized!');

  const { status, message, data }: SocketResponse<Result> =
    await socket.emitWithAck(eventName, payload);

  console.log('api message', message);

  if (!(status === 'ok' || status === 'error'))
    throw Error('Connection issue!');

  return data;
};
