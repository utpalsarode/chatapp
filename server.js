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
// console.log('io', io);

io.on('connection', (socket) => {
  console.log('User connected===================> ', socket.id);

  socket.on('message', () => console.log('welcome to socket messages.'));
  socket.on('setup', (userData) => {
    console.log('userData', userData);
    socket.join(userData.id);
    socket.emit('connected');
  });

  socket.on('Join Chat', (room) => {
    console.log('room', room);
    socket.join(room);
  });

  socket.on("new message", (newMessage) => {
    let chat = newMessage.chat;

    if (!chat.users) return console.log("users not defined!");

    chat.users.forEach(user => {
        if (user._id === newMessage.sender._id) return;

        socket.in(user._id).emit('message received', newMessage);   
    });
  })
});
