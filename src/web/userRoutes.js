const express = require("express");
const router = express.Router();
const { userController } = require("../controller");
const verify = require("../middleware/verify");
const { login, register, allUsers } = require("../controller/userController");

router.post('/register', register);
router.post('/login', login);
router.get('/getAllUsers/:id', allUsers)


module.exports = router;