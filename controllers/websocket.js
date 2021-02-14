let io;

const websocket = {
  init: httpServer => {
    io = require('socket.io')(httpServer, {
      cors: {
        origin: '*'
      }
    });
    return io;
  },
  getIO: () => {
    if (!io) throw new Error('IO not initialized!');
    return io;
  },
  listen: socket => {
    socket.on('ping', () => {
      socket.emit('pong');
    });
  },
  ping: socket => {
    setInterval(() => {
      socket.emit('ping', {
        iat: Date.now()
      });
    }, 10000);
  }
};

module.exports = websocket;
