const User = require('../models/useModel');
const { db } = require('../helper');
const jwt = require("jsonwebtoken");
const { handleError, handleSuccess } = require('../helper/response_handler');
const config = require('../config/config');
const asyncHandler = require('express-async-handler')

module.exports.login = async (req, res, next) => {
    let { status_code_config: statusCode, en_message_config: en } = config;
    try {
        let { email, password } = req.body;
        const userData = await User.findOne({ email });
        if (userData) {
            password = db.getEncryptDecryptData('encrypt', password);
            if (userData.password === password) {
                let data = {
                    name: userData.name,
                    id: userData._id
                }
                jwt.sign(data, config.secret, { expiresIn: '1d' }, (err, security_token) => {
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
        user.password = undefined;
        console.log('password', user);
        return handleSuccess(200, 'Data get successfully!', { status: true, user }, res);
    } catch (err) {
        next(err);
    }


}

module.exports.allUsers = asyncHandler(async (req, res) => {
    let { id } = req.params;
    const { search } = req.query;
    console.log('res.locals.user_id', res.locals.user_id)    
    const keyword = search ? {
        $or: [
            { name: { $regex: search, $options: "i"} },
            { email: { $regex: search, $options: "i"} }
        ]
    } : {}
    const users = await User.find(keyword).find({ _id: { $ne: id } }).select([
        'name',
        'email',    
        'avatarImage',
        '_id'
    ]);
    return handleSuccess(200, config.en_message_config.DATA_FETCH_SUCCESSFULLY, users, res);
})