const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        message: {
            text: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 50,
                unique: true
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },

    },
    {
        timestamps: true
    }

);

module.exports = mongoose.model('messages', messageSchema);