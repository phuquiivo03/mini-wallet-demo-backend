"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeError = normalizeError;
exports.getErrorStrategy = getErrorStrategy;
const Error_1 = require("./Error");
const errorCode_1 = require("./errorCode");
const errorMessage_1 = require("./errorMessage");
const error_strategies_1 = require("./error.strategies");
function normalizeError(err) {
    if (err.code === "P2010" && err.message.includes(errorCode_1.ErrorCodes.DEAD_LOCK)) {
        return new Error_1.AppError(errorCode_1.ErrorCodes.DEAD_LOCK, errorMessage_1.ErrorMessages.DEAD_LOCK, 500, false);
    }
    return new Error_1.AppError(err.code || "UNKNOWN", err.message, 500, false);
}
function getErrorStrategy(code) {
    const strategy = error_strategies_1.strategiesDictionary[code];
    if (strategy) {
        return strategy;
    }
    const defaultStrategy = error_strategies_1.errorStrategies[errorCode_1.ErrorStrategyCodes.UNKNOWN];
    return defaultStrategy;
}
//# sourceMappingURL=error.helper.js.map