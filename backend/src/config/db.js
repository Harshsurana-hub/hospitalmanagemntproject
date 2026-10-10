const mongoose = require("mongoose");

const connectDB = async (mongoUri) => {
    await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 10000
    });
};

module.exports = connectDB;
