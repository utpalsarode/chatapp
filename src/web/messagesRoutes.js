const express = require("express");
const messageRoutes = express.Router();
const { userController } = require("../controller");
const verify = require("../middleware/verify");
const { addMessage, getAllMessages } = require("../controller/messagesController");

messageRoutes.post('/add-message', addMessage);
messageRoutes.get('/get-messages', getAllMessages);


module.exports = messageRoutes;