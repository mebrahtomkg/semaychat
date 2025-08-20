import { Socket } from 'socket.io';
import { parse } from 'cookie';
import jwt from 'jsonwebtoken';
import { AUTH_TOKEN_COOKIE_NAME, JWT_SECRET_KEY } from '@/config/general';

export interface AuthenticatedSocket extends Socket {
  userId?: number;
}

interface AuthTokenPayload {
  id: number;
}

/**
 * Socket.io middleware to perform JWT authentication via cookies.
 * Attaches the userId to the socket object if authentication is successful.
 */
const performSocketAuth = (
  socket: AuthenticatedSocket,
  next: (err?: Error) => void,
) => {
  try {
    const cookieHeader = socket.handshake.headers.cookie;

    if (!cookieHeader) {
      throw Error('Authentication error: No cookies provided.');
    }

    const cookies = parse(cookieHeader);
    const token = cookies[AUTH_TOKEN_COOKIE_NAME];

    if (!token) {
      throw Error('Authentication error: Auth token not found.');
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as AuthTokenPayload;

      // Attach the user ID from the token to the socket object.
      // This makes it available in all event handlers.
      socket.userId = decoded.id;

      next();
    } catch (_err) {
      throw Error('Authentication error: Invalid token.');
    }
  } catch (err) {
    next(err as Error);
  }
};

export default performSocketAuth;
