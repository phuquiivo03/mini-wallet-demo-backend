"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRetry = handleRetry;
exports.handlePendingJob = handlePendingJob;
exports.handleCancelJob = handleCancelJob;
exports.handleDeadLockError = handleDeadLockError;
exports.sendTransactionNotification = sendTransactionNotification;
const constants_1 = require("../infrastructure/rabbitmq/constants");
const job_service_1 = __importDefault(require("../modules/job/job.service"));
const job_dto_1 = require("../modules/job/job.dto");
const errorCode_1 = require("../shared/errors/errorCode");
const transaction_1 = require("../modules/transaction");
const entry_service_1 = __importDefault(require("../modules/entry/entry.service"));
const account_service_1 = __importDefault(require("../modules/account/account.service"));
const websocket_gateway_1 = __importDefault(require("../websocket/gateway/websocket.gateway"));
const utils_1 = require("../utils");
async function handleRetry(msg, channel, retryQueueName) {
    console.log("Retrying:", retryQueueName);
    try {
        const data = JSON.parse(msg.content.toString());
        const retries = msg.properties.headers?.["x-retry-count"] || 0;
        if (retries >= constants_1.Queue.maxRetries) {
            handleCancelJob(data.id, msg, channel);
            return;
        }
        console.log("Retrying:", retries + 1);
        channel.sendToQueue(retryQueueName, msg.content, {
            headers: { "x-retry-count": retries + 1 },
        });
        channel.ack(msg);
    }
    catch (error) {
        throw error;
    }
}
async function handlePendingJob(msg, channel, jobId, excuteJob, retryQueueName) {
    try {
        const job = await job_service_1.default.get(jobId);
        if (job && job.status === job_dto_1.JobStatus.PENDING) {
            await excuteJob();
            await job_service_1.default.update(jobId, job_dto_1.JobStatus.COMPLETED);
            channel.ack(msg);
        }
    }
    catch (error) {
        handleRetry(msg, channel, retryQueueName);
    }
}
async function handleCancelJob(jobId, msg, channel) {
    console.log("Removing job:", jobId);
    await job_service_1.default.update(jobId, job_dto_1.JobStatus.FAILED);
    channel.nack(msg, false, false);
}
async function handleDeadLockError(error, channel, msg, retryQueueName) {
    if (error.message.includes(errorCode_1.ErrorCodes.DEAD_LOCK)) {
        handleRetry(msg, channel, retryQueueName);
    }
}
async function sendTransactionNotification(transferData) {
    const [fromAccount, toAccount] = await Promise.all([
        account_service_1.default.findByUserId(transferData.fromUserId),
        account_service_1.default.findByUserId(transferData.toUserId),
    ]);
    const [senderBalance, receiverBalance] = await Promise.all([
        entry_service_1.default.getBalanceByAccountId(fromAccount.id),
        entry_service_1.default.getBalanceByAccountId(toAccount.id),
    ]);
    websocket_gateway_1.default.sendNotification(transferData.fromUserId, JSON.stringify({
        title: "Transfer notification",
        description: `Transfer successfully✅✅☑️ \n Balance -${(0, utils_1.convertMoney)(transferData.amount, transaction_1.CurrencyEnum.VND)} \n New balance: ${(0, utils_1.convertMoney)(senderBalance, transaction_1.CurrencyEnum.VND)}`,
    }));
    websocket_gateway_1.default.sendNotification(transferData.toUserId, JSON.stringify({
        title: "Transfer notification",
        description: `Transfer successfully✅✅☑️ \n Balance +${(0, utils_1.convertMoney)(transferData.amount, transaction_1.CurrencyEnum.VND)} \n New balance: ${(0, utils_1.convertMoney)(receiverBalance, transaction_1.CurrencyEnum.VND)}`,
    }));
}
//# sourceMappingURL=helper.js.map