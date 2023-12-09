const { handleSuccess, handleError } = require("../helper/response_handler");
const Message = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        console.log('Hello world');
        const { from, to, message } = req.body;
        const createMessage = await Message.create({
            message: {
                text: message
            },
            users: [from, to],
            sender: from
        });
        if (createMessage) {
            return handleSuccess(200, 'message created', createMessage, res);
        } else {
            return handleError(400, 'failed to create message', res)
        }
    } catch (e) {
        next(e);
    }
}

module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 });
        const detailData = messages.map((msg) => {
            return {
                fromSelf: `${msg.sender}` === from,
                message: msg.message.text,
            }
        })
        if (detailData.length) {
            return handleSuccess(200, 'succefully get messages', detailData, res);
        } else {
            return handleError(400, 'failed to get messages', res);
        }
        console.log('Hello world gets all messages', detailData);
    } catch (e) {
        next(e);
    }
}