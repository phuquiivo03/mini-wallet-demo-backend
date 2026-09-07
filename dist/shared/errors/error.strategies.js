"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategiesDictionary = exports.errorStrategies = void 0;
const helper_1 = require("../../workers/helper");
const errorCode_1 = require("./errorCode");
exports.errorStrategies = {
    [errorCode_1.ErrorStrategyCodes.RETRY_JOB]: async ({ channel, msg, retryQueue }) => {
        await (0, helper_1.handleRetry)(msg, channel, retryQueue);
    },
    [errorCode_1.ErrorStrategyCodes.CANCEL_JOB]: async ({ channel, msg, data }) => {
        await (0, helper_1.handleCancelJob)(data.id, msg, channel);
    },
    [errorCode_1.ErrorStrategyCodes.UNKNOWN]: async ({ msg }) => {
        console.error("Unknown error", msg.content.toString());
    },
};
exports.strategiesDictionary = {
    [errorCode_1.ErrorCodes.DEAD_LOCK]: exports.errorStrategies[errorCode_1.ErrorStrategyCodes.RETRY_JOB],
    [errorCode_1.ErrorCodes.FAILED_TO_CREATE_ENTRY]: exports.errorStrategies[errorCode_1.ErrorStrategyCodes.RETRY_JOB],
    [errorCode_1.ErrorCodes.JOB_UPDATED_FAILED]: exports.errorStrategies[errorCode_1.ErrorStrategyCodes.CANCEL_JOB],
    [errorCode_1.ErrorCodes.INSUFFICIENT_BALANCE]: exports.errorStrategies[errorCode_1.ErrorStrategyCodes.CANCEL_JOB],
};
//# sourceMappingURL=error.strategies.js.map