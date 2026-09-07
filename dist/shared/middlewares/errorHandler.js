"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.errorHandler = void 0;
const Error_1 = require("../errors/Error");
const errorCode_1 = require("../errors/errorCode");
const response_1 = require("../../pkg/app/response");
const errorHandler = (err, req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    if (err instanceof Error_1.AppError) {
        console.error({
            code: err.code,
            message: err.message,
            stack: err.stack,
            statusCode: req.path,
        });
        if (err.statusCode == 400) {
            customExpress.response400(errorCode_1.ErrorStatusCode.BAD_REQUEST, {
                reason: err.message,
            });
        }
        else {
            customExpress.response500(errorCode_1.ErrorStatusCode.INTERNAL_SERVER_ERROR, {
                reason: err.message,
            });
        }
        return;
    }
    customExpress.response500(errorCode_1.ErrorStatusCode.INTERNAL_SERVER_ERROR, {
        reason: err.message,
    });
};
exports.errorHandler = errorHandler;
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=errorHandler.js.map