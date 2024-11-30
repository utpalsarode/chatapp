const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    isAvatarImage: {
        type: Boolean,
        default: false,
    },
    avatarImage: {
        type: String,
        default: "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?semt=ais_hybrid"
    }
});

module.exports = mongoose.model('users', usersSchema);