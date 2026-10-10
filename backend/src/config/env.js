const readConfig = (env) => {
    const requiredVariables = ["MONGO_URI", "JWT_SECRET", "FRONTEND_URL"];

    for (const key of requiredVariables) {
        if (!env[key]?.trim()) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    }

    if (!/^mongodb(?:\+srv)?:\/\//.test(env.MONGO_URI)) {
        throw new Error("MONGO_URI must be a MongoDB connection string");
    }

    if (env.JWT_SECRET.length < 32 || env.JWT_SECRET.startsWith("replace-with-")) {
        throw new Error("JWT_SECRET must be a unique secret with at least 32 characters");
    }

    const origin = new URL(env.FRONTEND_URL);
    if (!["http:", "https:"].includes(origin.protocol) || origin.origin !== env.FRONTEND_URL) {
        throw new Error("FRONTEND_URL must be an HTTP origin without a trailing slash");
    }

    const port = Number(env.PORT || 5000);
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
        throw new Error("PORT must be an integer from 1 to 65535");
    }

    return {
        port,
        mongoUri: env.MONGO_URI,
        jwtSecret: env.JWT_SECRET,
        frontendUrl: env.FRONTEND_URL
    };
};

module.exports = readConfig;
