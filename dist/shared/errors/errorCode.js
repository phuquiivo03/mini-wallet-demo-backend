"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorStrategyCodes = exports.ErrorStatusCode = exports.ErrorCodes = void 0;
exports.ErrorCodes = {
    DEAD_LOCK: "40P01",
    INSUFFICIENT_BALANCE: "INSUFFICIENT_BALANCE",
    FAILED_TO_CREATE_ENTRY: "FAILED_TO_CREATE_ENTRY",
    FAILED_TO_CREATE_JOB: "FAILED_TO_CREATE_JOB",
    JOB_UPDATED_FAILED: "UPDATE_JOB_FAILED",
    FAILED_TO_CREATE_ACCOUNT: "FAILED_TO_CREATE_ACCOUNT",
    FAILED_TO_GET_JOB: "FAILED_TO_GET_JOB",
    JOB_IS_COMPLETED: "JOB_IS_COMPLETED",
    JOB_IS_FAILED: "JOB_IS_FAILED",
    UNDEFINED_JOB: "UNDEFINED_JOB",
    UNKNOWN: "UNKNOWN",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    BAD_REQUEST: "BAD_REQUEST",
    NOT_FOUND: "NOT_FOUND",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
};
var ErrorStatusCode;
(function (ErrorStatusCode) {
    ErrorStatusCode[ErrorStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ErrorStatusCode[ErrorStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorStatusCode[ErrorStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    ErrorStatusCode[ErrorStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    ErrorStatusCode[ErrorStatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    ErrorStatusCode[ErrorStatusCode["CONFLICT"] = 409] = "CONFLICT";
    ErrorStatusCode[ErrorStatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    ErrorStatusCode[ErrorStatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    ErrorStatusCode[ErrorStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    ErrorStatusCode[ErrorStatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    ErrorStatusCode[ErrorStatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    ErrorStatusCode[ErrorStatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    ErrorStatusCode[ErrorStatusCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
})(ErrorStatusCode || (exports.ErrorStatusCode = ErrorStatusCode = {}));
exports.ErrorStrategyCodes = {
    RETRY_JOB: "RETRY_JOB",
    CANCEL_JOB: "CANCEL_JOB",
    UNKNOWN: "UNKNOWN",
};
//# sourceMappingURL=errorCode.js.map