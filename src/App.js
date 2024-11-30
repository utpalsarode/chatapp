const express = require("express");
const cors = require('cors');
const path = require('path')
const dotenv = require('dotenv');
const env = process.env.SERVER || 'local'
dotenv.config({ path: path.resolve(__dirname, 'config', `.env_${env}`) });
const routes = require('./web');
const connectDB = require('./db');
const verifyToken = require("./middleware/verify");

connectDB();
const app = express();

const whishlist = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({ origin: whishlist }));
app.use(express.json());

const publicRoutes = ['/login', '/register'];
app.use((req, res, next) => {
    if (publicRoutes.includes(req.path.split(process.env.SITE_PREFIX)[1])) return next();
    verifyToken(req, res, next);
});

app.use('/api/auth', routes);

app.use((req, res) => {
    const err = new Error('Not Found');
    err.status = 404;
    res.send({ 'status': err.status, 'message': 'Not found' });
});

app.set('port', Number(process.env.PORT) || 8000);
module.exports = { app };
