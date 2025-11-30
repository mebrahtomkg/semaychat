import { getUserStatusObservers, updateUsersLastSeenTime } from '@/services';
import { SocketUser } from './types';
import { AuthenticatedSocket } from '@/types';
import { SOCKET_USER_TIME_TO_LIVE } from '@/config/general';
import { emitToUser } from './emitter';

const socketUsersMap = new Map<number, SocketUser>();

class SocketUsersManager {
  constructor() {
    setInterval(this.processOfflineUsers, 15000);
  }

  public get(userId: number) {
    return socketUsersMap.get(userId);
  }

  public async handleConnection(socket: AuthenticatedSocket) {
    try {
      const { userId } = socket;

      if (!userId) {
        throw new Error('Invalid user id.');
      }

      socketUsersMap.set(userId, {
        socketId: socket.id,
        expiresAt: Date.now() + SOCKET_USER_TIME_TO_LIVE,
      });

      socket.on('heartbeat', () => this.handleHeartbeat(socket));
      socket.on('disconnect', () => this.handleDisconnect(socket));

      const observers = await getUserStatusObservers(userId);
      observers.forEach((observer) => {
        emitToUser(observer, 'user_connected', { userId });
      });
    } catch (err) {
      console.error(err);
    }
  }

  private async handleHeartbeat(socket: AuthenticatedSocket) {
    try {
      const { userId } = socket;

      if (!userId) {
        throw new Error('Invalid user id.');
      }

      socketUsersMap.set(userId, {
        socketId: socket.id,
        expiresAt: Date.now() + SOCKET_USER_TIME_TO_LIVE,
      });
    } catch (err) {
      console.error(err);
    }
  }

  private async handleDisconnect(socket: AuthenticatedSocket) {
    try {
      const { userId } = socket;

      if (!userId) {
        throw new Error('Invalid user id.');
      }

      socketUsersMap.delete(userId);
      const now = Date.now();
      await updateUsersLastSeenTime([userId], now);
      const observers = await getUserStatusObservers(userId);
      observers.forEach((observer) => {
        emitToUser(observer, 'user_disconnected', {
          userId,
          lastSeenTime: now,
        });
      });
    } catch (err) {
      console.error(err);
    }
  }

  private async processOfflineUsers() {
    try {
      const offlineUsers: number[] = [];
      const now = Date.now();

      // Identify offline users
      for (const [userId, socketUser] of socketUsersMap.entries()) {
        if (socketUser.expiresAt < now) {
          offlineUsers.push(userId);
        }
      }

      // Remove offline users from socket users map
      offlineUsers.forEach((userId) => {
        socketUsersMap.delete(userId);
      });

      if (offlineUsers.length === 0) return;

      await updateUsersLastSeenTime(offlineUsers, now);

      for (const userId of offlineUsers) {
        const observers = await getUserStatusObservers(userId);

        observers.forEach((observer) => {
          emitToUser(observer, 'user_disconnected', {
            userId,
            lastSeenTime: now,
          });
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
}

const socketUsersManager = new SocketUsersManager();

export default socketUsersManager;
