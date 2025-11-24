interface SocketUser {
  socketId: string;
  expiresAt: number;
}

const socketUsersMap = new Map<number, SocketUser>();

const socketUsers = {
  set: (userId: number, socketUser: SocketUser) => {
    socketUsersMap.set(userId, socketUser);
  },

  del: (userId: number) => {
    socketUsersMap.delete(userId);
  },

  get: (userId: number) => socketUsersMap.get(userId),
};

export default socketUsers;
