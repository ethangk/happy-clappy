import io  from 'socket.io-client';

export default class SocketManager {
  constructor(addr = 'ws://localhost:8080') {
    this.ws = io(addr);

    this.ws.on('connect', function () {
      console.log(`Connected over WS to ${addr}`);
    });

    this.ws.on('disconnect', function () {
      console.log(`WS disconnected from ${addr}`);
    });
  }

  sendMessage(event, message) {
    this.ws.emit(event, message);
  }

  registerListener(event, callback) {
    this.ws.on(event, callback);
  }
}