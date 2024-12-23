const adminController = require('./adminController');
const userController = require('./userController');
const messagesController = require('./messagesController');
const chatController = require('./chatController');
const GenrerateToken = require('./generate_token');
const simulatorController = require('./simulatorController');

module.exports = {
    adminController,
    userController,
    messagesController,
    chatController,
    GenrerateToken,
    simulatorController
}