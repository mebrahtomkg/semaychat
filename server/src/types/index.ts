import * as express from 'express';
import { Socket } from 'socket.io';

declare module 'express' {
  interface Request {
    userId?: number;
  }
}

export type VisibilityOption = 'everybody' | 'contacts' | 'nobody';

export interface AuthenticatedSocket extends Socket {
  userId?: number;
}

interface SocketResponse {
  status: 'ok' | 'error';
  message: string;
  data?: unknown;
}

export type Acknowledgement = (response: SocketResponse) => void;
