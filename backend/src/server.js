require("dotenv/config");
const mongoose = require("mongoose");
const readConfig = require("./config/env");
const connectDB = require("./config/db");
const createApp = require("./app");

const startServer = async () => {
    let config;

    try {
        config = readConfig(process.env);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

    try {
        await connectDB(config.mongoUri);
    } catch (err) {
        console.error("Unable to connect to MongoDB. Check the connection settings and network access.");
        process.exit(1);
    }

    const app = createApp(config);
    const server = app.listen(config.port, () => {
        console.log(`Library API listening on port ${config.port}`);
    });

    const shutdown = () => {
        server.close(async () => {
            await mongoose.disconnect();
            process.exit(0);
        });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
};

startServer();
