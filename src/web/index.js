const express = require("express");
const router = express.Router();
const admin_routes = require('./admin_route');
const user_routes = require('./userRoutes');
const message_routes = require('./userRoutes');

router.use('/', user_routes);

router.use('/', message_routes);

// router.use('/', admin_routes);

module.exports = router;