const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URL).then((conn) => {
        console.log(`Database connection established: ${conn.connection.host}`);
    }).catch((err) => {
        console.log('Error connecting to Database!', err);
        process.exit();
    })
}

module.exports = connectDB;