const express = require("express");
const messageRoutes = express.Router();
const { userController } = require("../controller");
const verify = require("../middleware/verify");
const { addMessage, getAllMessages } = require("../controller/messagesController");

messageRoutes.post('/', addMessage);
messageRoutes.get('/', getAllMessages);


module.exports = messageRoutes;