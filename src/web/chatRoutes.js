const express = require("express");
const chatRoutes = express.Router();
const { chatController } = require("../controller");
const verify = require("../middleware/verify");

chatRoutes.post('/', chatController.accessChat);
chatRoutes.get('/', chatController.fetchChats);
chatRoutes.post('/create-group', chatController.createGroupChat);
chatRoutes.put('/rename-group', chatController.renameGroupChat);
chatRoutes.put('/group-add', chatController.groupAdd);
chatRoutes.put('/group-remove', chatController.groupRemove);
// chatRoutes.post('/get-messages', getAllMessages);


module.exports = chatRoutes;