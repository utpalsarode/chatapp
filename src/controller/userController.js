const User = require('../models/useModel');
const { db } = require('../helper');
const jwt = require("jsonwebtoken");
const { handleError, handleSuccess } = require('../helper/response_handler');
const config = require('../config/config');

module.exports.login = async (req, res, next) => {
    let { status_code_config: statusCode, en_message_config: en } = config;
    try {
        let { name, password } = req.body;
        const userData = await User.findOne({ name: name });
        // console.log('userData', process.env.SECRET_KEY);
        // return;
        if (userData) {
            password = db.getEncryptDecryptData('encrypt', password);
            if (userData.password === password) {
                let data = {
                    name: userData.name,
                    id: userData._id,
                }
                jwt.sign(data, process.env.SECRET_KEY, { expiresIn: 1440 * 60 }, (err, security_token) => {
                    if (err) {
                        throw err;
                    } else {
                        res.setHeader("security_token", Buffer.from(security_token).toString('base64'));
                        let return_data = {
                            user_data: data,
                            token: Buffer.from(security_token).toString('base64')
                        };
                        return handleSuccess(statusCode.OK, en.LOGIN_SUCESSFULLY, return_data, res);
                    }
                }); /* 24 hours */
            } else {
                return handleError(statusCode.OK, en.WRONG_PASSWORD, res);
            }
        } else {
            return handleError(statusCode.OK, 'username or password is wrong!', res);
        }

    } catch (err) {
        next(err);
    }
}

module.exports.register = async (req, res, next) => {
    try {
        let { name, email, password } = req.body;
        const userNameCheck = await User.findOne({ name: name });
        if (userNameCheck) { return res.json({ message: "username will already registered!", status: false }) }
        const emailCheck = await User.findOne({ email: email });
        if (emailCheck) { return res.json({ message: "email will already registered!", status: false }) }
        password = db.getEncryptDecryptData('encrypt', password);
        const user = await User.create({
            name,
            email,
            password
        });
        delete user.password;
        console.log('password', user);
        return handleSuccess(200, 'user created successfully', { status: true, user }, res);
    } catch (err) {
        next(err);
    }


}

module.exports.allUsers = async (req, res, next) => {
    try {
        let { id } = req.params;
        const users = await User.find({ _id: { $ne: id } }).select([
            'name',
            'email',
            'avatarImage',
            '_id'
        ]);
        return handleSuccess(200, 'user created successfully', users, res);
    } catch (err) {
        next(err);
    }


}