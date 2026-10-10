const mongoose = require("mongoose");

const healthController = {
    getHealth: (req, res) => {
        if (mongoose.connection.readyState !== 1) {
            return res.status(503).json({
                error: { message: "Database unavailable" }
            });
        }

        res.status(200).json({
            data: { status: "ok" }
        });
    }
};

module.exports = healthController;
