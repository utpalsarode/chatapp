const { app } = require('./src/App');

const server = app.listen(app.get('port'), function () {
  console.log('Chat app ' + process.env.NODE_ENV + ' started on Port No. ', app.get('port'));
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
});

const onlineUsers = new Map();
io.on('connection', (socket) => {
  socket.on('message', () => console.log('welcome to socket messages.'));
  socket.on('setup', (userData) => {
    socket.join(userData.id);
    socket.emit('connected');
    onlineUsers.set(userData.id, socket.id);    
  });

  socket.on('Join Chat', (room) => {
    socket.join(room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on("new message", (newMessage) => {
    let chat = newMessage.chat;
    if (chat.isGroupChat) {
      // Handle group chat messages
      chat.users.forEach((user) => {
        if (user._id !== newMessage.sender._id && onlineUsers.has(user._id)) {
          socket.in(onlineUsers.get(user._id)).emit("message received", newMessage);
        }
      });
    } else {
      // Handle one-to-one chat messages
      const recipientId = chat.users.find((user) => user._id !== newMessage.sender._id);
      if (onlineUsers.has(recipientId)) {
        socket.in(onlineUsers.get(recipientId)).emit("message received", newMessage);
      }
    }
  });

  socket.off('setup', () => {
    socket.leave(userData.id);
  })
  
  // Disconnect user
  socket.on("disconnect", () => {
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
    console.log("A user disconnected:", socket.id);
  });

});
