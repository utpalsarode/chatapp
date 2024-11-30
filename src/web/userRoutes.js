const express = require("express");
const router = express.Router();
const { login, register, allUsers } = require("../controller/userController");

router.post('/register', register);
router.post('/login', login);
router.get('/getAllUsers/:id', allUsers)


module.exports = router;