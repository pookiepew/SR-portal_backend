import { Server } from 'socket.io';
let io;

const websocket = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: '*',
      },
    });
    return io;
  },
  getIO: () => {
    if (!io) throw new Error('IO not initialized!');
    return io;
  },
  listen: (socket) => {
    socket.on('ping', () => {
      socket.emit('pong');
    });
  },
};

export default websocket;
