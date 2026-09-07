"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFoundError = exports.BadRequestError = exports.AppError = void 0;
class AppError extends Error {
    code;
    retryable;
    isOperational;
    statusCode;
    constructor(code, message, statusCode = 500, retryable = false, isOperational = true) {
        super(message);
        this.code = code;
        this.retryable = retryable;
        this.isOperational = isOperational;
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class BadRequestError extends AppError {
    constructor(code, message) {
        super(code, message, 400, false, false);
    }
}
exports.BadRequestError = BadRequestError;
class NotFoundError extends AppError {
    constructor(code, message) {
        super(code, message, 404, false, false);
    }
}
exports.NotFoundError = NotFoundError;
class InternalServerError extends AppError {
    constructor(code, message) {
        super(code, message, 500, false, false);
    }
}
exports.InternalServerError = InternalServerError;
//# sourceMappingURL=Error.js.map