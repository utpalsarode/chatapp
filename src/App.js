const express = require("express");
const cors = require('cors');
const path = require('path')
const dotenv = require('dotenv');
const env = process.env.SERVER || 'local'
dotenv.config({ path: path.resolve(__dirname, 'config', `.env_${env}`) });
const routes = require('./web');
const connectDB = require('./db');
const verifyToken = require("./middleware/verify");
const { status_code_config, en_message_config } = require("./config/config");
const { handleError } = require("./helper/response_handler");

connectDB();
const app = express();

const whishlist = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({ origin: whishlist }));
app.use(express.json());

const publicRoutes = ['/login', '/register'];
app.use((req, res, next) => {
    if (publicRoutes.includes(req.path.split(process.env.SITE_PREFIX)[1])) return next();
    try {
        verifyToken(req, res, next);
    } catch (error) {
        console.log('errror', error);
        
    }
});

app.use('/api/auth', routes);

app.use((err, req, res, next) => {
    console.error('Error:', err);
  
    // Send a 400 status code for all errors handled by expressAsyncHandler
    return handleError(status_code_config.BAD_REQUEST, en_message_config.ERROR_SOMETHING_WRONG, res);
  });

app.use((req, res) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.send({ 'status': err.status, 'message': 'Not found' });
});

app.set('port', Number(process.env.PORT) || 8000);
module.exports = { app };
