const mongoose = require('mongoose');
const config = require('config');
const database = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(database, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
         });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        // Zakończ działanie programu
        process.exit(1);
    }
};

module.exports = connectDB;