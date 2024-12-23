const { trim } = require('common-utils');
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    users: Array,
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  {
    timestamps: true,
  },
);

// text: {
//     type: String,
//     required: true,
//     minlength: 1,
//     maxlength: 50,
//     unique: true
// },

module.exports = mongoose.model('messages', messageSchema);
