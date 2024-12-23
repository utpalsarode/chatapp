const expressAsyncHandler = require("express-async-handler");
const { handleSuccess, handleError } = require("../helper/response_handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const { status_code_config, en_message_config } = require("../config/config");

module.exports.accessChat = expressAsyncHandler(async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return handleError(400, "user id not get!", res);
  }
  console.log("req.user", res.locals.user_id);

  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: res.locals.user_id } } },
      { users: { $elemMatch: { $eq: user_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name avatarImage email",
  });

  if (isChat.length) {
    return handleSuccess(200, "succefully get messages", isChat, res);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [res.locals.user_id, user_id],
    };

    try {
      const createChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
            "users",
            "-password"
        );
      return handleSuccess(200, "succefully get fullChat", fullChat, res);
    } catch (error) {
      return handleError(400, error.message, res);
    }
  }
});

module.exports.fetchChats = expressAsyncHandler(async (req, res) => {
    let result = await Chat.find({
      users: { $elemMatch: { $eq: res.locals.user_id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    
    result = await User.populate(result, {
      path: "latestMessage.sender",
      select: "name avatarImage email",
    });

    
    return handleSuccess(200, "succefully get all chats", result, res);
});

module.exports.createGroupChat = expressAsyncHandler(async (req, res) => {
    let { users, name } = req.body;
    if (!users || !name) {
        return handleError(status_code_config.BAD_REQUEST, en_message_config.ERROR_FILL_ALL_FIELDS, res);
    }

    users = JSON.parse(users)

    if (users.length < 2) {
        return handleError(status_code_config.BAD_REQUEST, 'Minimum 2 users are required!', res);
    }

    users.push(res.locals.user_id)

    try {
        const groupChat = await Chat.create({
            chatName: name,
            users,
            isGroupChat: true,
            groupAdmin: res.locals.user_id
        })

        const fullChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        return handleSuccess(200, "succefully created group.", fullChat, res);
    } catch (error) {
        console.log('error', error);
        
    }
});


module.exports.renameGroupChat = expressAsyncHandler(async (req, res) => {
    const { chat_id, chatName } = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(chat_id, { chatName }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (updatedChat) {
        return handleSuccess(status_code_config.OK, "succefully update chatname!", updatedChat, res);
    } else {
        return handleError(status_code_config.BAD_REQUEST, error.message, res);
    }
});

module.exports.groupAdd = expressAsyncHandler(async (req, res) => {
    const { chat_id, user_id } = req.body;

    const addedUserGroupChat = await Chat.findByIdAndUpdate(chat_id, { $push: { users: user_id } }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    
    if (addedUserGroupChat) {
        return handleSuccess(status_code_config.OK, "succefully added user!", addedUserGroupChat, res);
    } else {
        return handleError(status_code_config.BAD_REQUEST, error.message, res);
    }
});

module.exports.groupRemove = expressAsyncHandler(async (req, res) => {
    const { chat_id, user_id } = req.body;

    const removedUserGroupChat = await Chat.findByIdAndUpdate(chat_id, { $pull: { users: user_id } }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
    
    if (removedUserGroupChat) {
        return handleSuccess(status_code_config.OK, "succefully removed user!", removedUserGroupChat, res);
    } else {
        return handleError(status_code_config.BAD_REQUEST, error.message, res);
    }
});

