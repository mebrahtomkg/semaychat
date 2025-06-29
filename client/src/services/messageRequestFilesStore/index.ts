const files = new Map<number, File>();

export const addMessageRequestFile = (fileId: number, file: File) =>
  files.set(fileId, file);

export const getMessageRequestFile = (fileId: number) => files.get(fileId);

export const removeMessageRequestFile = (fileId: number) =>
  files.delete(fileId);
