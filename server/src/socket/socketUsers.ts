const socketUsers = new Map<number, string>();

export const addSocketUser = (userId: number, socketId: string) => {
  socketUsers.set(userId, socketId);
};

export const removeSocketUser = (userId: number) => {
  socketUsers.delete(userId);
};

export const getSocketId = (userId: number): string | undefined => {
  return socketUsers.get(userId);
};
