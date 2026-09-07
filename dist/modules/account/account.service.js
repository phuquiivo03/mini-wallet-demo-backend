"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../../infrastructure/prisma/connect"));
const utils_1 = require("../../utils");
const account_schema_1 = require("./account.schema");
const errorMessage_1 = require("../../shared/errors/errorMessage");
const Error_1 = require("../../shared/errors/Error");
const errorCode_1 = require("../../shared/errors/errorCode");
class AccountService {
    async createAccount(userId, currency) {
        try {
            const account = await connect_1.default.account.create({
                data: { userId, currency },
            });
            return (0, utils_1.parseOrThrow)(account_schema_1.accountSchema, account);
        }
        catch (error) {
            throw new Error_1.AppError(errorCode_1.ErrorCodes.FAILED_TO_CREATE_ACCOUNT, errorMessage_1.ErrorMessages.FAILED_TO_CREATE_ACCOUNT, errorCode_1.ErrorStatusCode.BAD_REQUEST, false);
        }
    }
    async findById(id) {
        const account = await connect_1.default.account.findUnique({
            where: { id },
        });
        return (0, utils_1.parseOrThrow)(account_schema_1.accountSchema, account);
    }
    async findByUserId(userId) {
        const account = await connect_1.default.account.findUnique({
            where: { userId },
        });
        if (!account) {
            throw new Error_1.AppError(errorCode_1.ErrorCodes.BAD_REQUEST, errorMessage_1.ErrorMessages.ACCOUNT_NOT_FOUND, errorCode_1.ErrorStatusCode.BAD_REQUEST);
        }
        return (0, utils_1.parseOrThrow)(account_schema_1.accountSchema, account);
    }
    async lockAccount(id, tx) {
        await tx.$queryRaw `
            SELECT * FROM "Account" WHERE id = ${id} FOR UPDATE
          `;
    }
}
exports.default = new AccountService();
//# sourceMappingURL=account.service.js.map