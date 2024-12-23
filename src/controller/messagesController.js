const expressAsyncHandler = require('express-async-handler');
const { handleSuccess, handleError } = require('../helper/response_handler');
const Chat = require('../models/chatModel');
const Message = require('../models/messageModel');
const User = require('../models/userModel');

module.exports.addMessage = expressAsyncHandler(async (req, res, next) => {
  try {
    const { chatId, message } = req.body;
    if (!chatId || !message) {
      return handleError(400, 'Please fill all the fields!', res);
    }
    const userId = res.locals.user_id;
    let createMessage = await Message.create({
      message,
      users: [userId, chatId],
      sender: userId,
      chat: chatId,
    });
    createMessage = await createMessage.populate('sender', 'name avatarImage');
    createMessage = await createMessage.populate('chat');
    createMessage = await User.populate(createMessage, {
      path: 'chat.users',
      select: 'name avatarImage email',
    });

    await Chat.findByIdAndUpdate(chatId, {
      latestMessage: createMessage,
    });
    if (createMessage) {
      return handleSuccess(200, 'message created', createMessage, res);
    } else {
      return handleError(400, 'failed to create message', res);
    }
  } catch (e) {
    next(e);
  }
});

module.exports.getAllMessages = expressAsyncHandler(async (req, res, next) => {
  try {
    const { chatId } = req.query;
    const messages = await Message.find({ chat: chatId }).sort({ updatedAt: 1 }).populate('sender', 'name avatarImage email').populate('chat');
    // const detailData = messages.map((msg) => {
    //   return {
    //     fromSelf: `${msg.sender}` === from,
    //     message: msg.message,
    //   };
    // });
    if (messages.length) {
      return handleSuccess(200, 'succefully get messages', messages, res); 
    } else {
      return handleError(202, 'No messages!', res);
    }
  } catch (e) {
    next(e);
  }
});
