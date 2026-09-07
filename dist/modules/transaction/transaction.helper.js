"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_service_1 = __importDefault(require("../account/account.service"));
const entry_service_1 = __importDefault(require("../entry/entry.service"));
const client_1 = require("@prisma/client");
const errorMessage_1 = require("../../shared/errors/errorMessage");
const errorCode_1 = require("../../shared/errors/errorCode");
const Error_1 = require("../../shared/errors/Error");
class TransactionHelper {
    async validTRansfer(data) {
        try {
            const senderAccount = await account_service_1.default.findByUserId(data.fromUserId);
            const receiverAccount = await account_service_1.default.findByUserId(data.toUserId);
            if (!senderAccount || !receiverAccount) {
                throw new Error_1.AppError(errorMessage_1.ErrorMessages.FAILED_TO_FIND_ACCOUNT, errorMessage_1.ErrorMessages.FAILED_TO_FIND_ACCOUNT);
            }
            const senderBalance = await entry_service_1.default.getBalanceByAccountId(senderAccount.id);
            if (senderBalance.lessThan(client_1.Prisma.Decimal(data.amount.toString()))) {
                throw new Error_1.BadRequestError(errorCode_1.ErrorCodes.INSUFFICIENT_BALANCE, errorMessage_1.ErrorMessages.INSUFFICIENT_BALANCE);
            }
            return { senderAccount, receiverAccount };
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = new TransactionHelper();
//# sourceMappingURL=transaction.helper.js.map