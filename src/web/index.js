const express = require("express");
const router = express.Router();
const admin_routes = require('./admin_route');
const user_routes = require('./userRoutes');
const chat_routes = require('./chatRoutes')
const message_routes = require('./messagesRoutes');

router.use('/', user_routes);

router.use('/chat', chat_routes);

router.use('/messages', message_routes);

// router.use('/', admin_routes);

module.exports = router;