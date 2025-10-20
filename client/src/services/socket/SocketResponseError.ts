export default class SocketResponseError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'SocketResponseError';
  }
}
