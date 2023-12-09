const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat').then(() => {
    console.log('Database connection established!');
}).catch((err) => {
    console.log('Error connecting to Database!', err);
})