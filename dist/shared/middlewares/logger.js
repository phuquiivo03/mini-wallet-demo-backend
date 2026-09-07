"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = requestLogger;
exports.requestIdMiddleware = requestIdMiddleware;
const uuid_1 = require("uuid");
function requestLogger(req, res, next) {
    const start = Date.now();
    res.on("finish", () => {
        const durationMs = Date.now() - start;
        console.log({
            requestId: req.headers["x-request-id"],
            timestamp: new Date().toISOString(),
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            durationMs,
            ip: req.ip,
        });
    });
    next();
}
function requestIdMiddleware(req, res, next) {
    const requestId = (0, uuid_1.v4)();
    req.headers["x-request-id"] = requestId;
    next();
}
//# sourceMappingURL=logger.js.map