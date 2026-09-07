"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferWorker = void 0;
const connect_1 = require("../infrastructure/rabbitmq/connect");
const constants_1 = require("../infrastructure/rabbitmq/constants");
const utils_1 = require("../utils");
const transaction_schema_1 = require("../modules/transaction/transaction.schema");
const transaction_service_1 = __importDefault(require("../modules/transaction/transaction.service"));
const entry_service_1 = __importDefault(require("../modules/entry/entry.service"));
const transaction_helper_1 = __importDefault(require("../modules/transaction/transaction.helper"));
const client_1 = require("@prisma/client");
const transaction_1 = require("../modules/transaction");
const errorMessage_1 = require("../shared/errors/errorMessage");
const job_service_1 = __importDefault(require("../modules/job/job.service"));
const job_dto_1 = require("../modules/job/job.dto");
const connect_2 = __importDefault(require("../infrastructure/prisma/connect"));
const account_1 = require("../modules/account");
const errorCode_1 = require("../shared/errors/errorCode");
const Error_1 = require("../shared/errors/Error");
const error_helper_1 = require("../shared/errors/error.helper");
const helper_1 = require("./helper");
const transferWorker = async () => {
    const channel = await (0, connect_1.connectQueue)();
    channel.consume(constants_1.QueueName.TRANSACTION, async (msg) => {
        await handleError(msg, channel, async () => {
            const data = JSON.parse(msg?.content.toString() || "{}");
            const updated = await job_service_1.default.updateAndCount(data.id, job_dto_1.JobStatus.PROCESSING);
            const j = await job_service_1.default.get(data.id);
            console.log(j);
            if (updated === 0)
                throw new Error_1.AppError(errorCode_1.ErrorCodes.JOB_UPDATED_FAILED, errorMessage_1.ErrorMessages.JOB_UPDATED_FAILED);
            const job = await job_service_1.default.get(data.id);
            const transferData = await processTransaction(job);
            await job_service_1.default.update(job.id, job_dto_1.JobStatus.COMPLETED);
            channel.ack(msg);
            console.log("Transaction completed");
            await (0, helper_1.sendTransactionNotification)(transferData);
        });
    });
};
exports.transferWorker = transferWorker;
async function handleError(msg, channel, callback) {
    const data = JSON.parse(msg.content.toString());
    try {
        return await Promise.resolve(callback());
    }
    catch (error) {
        const err = (0, error_helper_1.normalizeError)(error);
        console.error("Error in handleError", err.code, "message:", err.message);
        const strategy = (0, error_helper_1.getErrorStrategy)(err.code);
        if (strategy)
            await strategy({
                channel,
                msg,
                data,
                retryQueue: constants_1.QueueName.TRANSFER_RETRY,
            });
    }
}
async function processTransaction(data) {
    const transferData = (0, utils_1.parseOrThrow)(transaction_schema_1.transferSchema, data.data);
    await connect_2.default.$transaction(async (tx) => {
        const { senderAccount, receiverAccount } = await transaction_helper_1.default.validTRansfer(transferData);
        await account_1.AccountService.lockAccount(senderAccount.id, tx);
        await account_1.AccountService.lockAccount(receiverAccount.id, tx);
        const transaction = await transaction_service_1.default.create(transferData, tx);
        const entries = await entry_service_1.default.createMany([
            {
                transactionId: transaction.id,
                accountId: senderAccount.id,
                amount: client_1.Prisma.Decimal(-transferData.amount),
                role: transaction_1.TransferRoles.SENDER,
            },
            {
                transactionId: transaction.id,
                accountId: receiverAccount.id,
                amount: client_1.Prisma.Decimal(transferData.amount.toString()),
                role: transaction_1.TransferRoles.RECEIVER,
            },
        ], tx);
        if (entries !== 2) {
            throw new Error_1.AppError(errorCode_1.ErrorCodes.FAILED_TO_CREATE_ENTRY, errorMessage_1.ErrorMessages.FAILED_TO_CREATE_ENTRY);
        }
        await transaction_service_1.default.update(transaction.id, transaction_1.TransactionStatus.COMPLETED, tx);
    });
    return transferData;
}
//# sourceMappingURL=transfer.js.map