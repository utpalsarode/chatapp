const express = require("express");
const cors = require('cors');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const routes = require('./web');
const messageRoutes = require("./web/messagesRoutes");

const app = express();
require('dotenv').config();
const whishlist = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({ origin: whishlist }));
app.use(express.json());

app.use('/api/auth', routes);
app.use('/api/auth', messageRoutes);

app.use((req, res) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.send({ 'status': err.status, 'message': 'Not found' });
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connection established!');
}).catch((err) => {
    console.log('Error connecting to Database!', err);
})

app.set('port', Number(process.env.PORT) || 8000);
module.exports = { app };
