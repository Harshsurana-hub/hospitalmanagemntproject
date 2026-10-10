const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    let status = 500;
    let message = "Internal server error";

    if (err.type === "entity.parse.failed") {
        status = 400;
        message = "Invalid JSON body";
    } else if (err.type === "entity.too.large") {
        status = 413;
        message = "Request body too large";
    }

    res.status(status).json({
        error: { message }
    });
};

module.exports = errorHandler;
