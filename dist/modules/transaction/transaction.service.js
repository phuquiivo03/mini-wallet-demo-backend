"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../../infrastructure/prisma/connect"));
const transaction_schema_1 = require("./transaction.schema");
const utils_1 = require("../../utils");
class TransactionService {
    async create(data, tx) {
        const transaction = await (tx || connect_1.default).transaction.create({
            data: {
                type: "transfer",
                status: "pending",
                message: data.message,
            },
        });
        return (0, utils_1.parseOrThrow)(transaction_schema_1.TransactionSchema, transaction);
    }
    async transfer() {
        await connect_1.default.transaction.create({
            data: {
                type: "transfer",
                status: "pending",
            },
        });
    }
    async update(transactionId, status, tx) {
        await (tx || connect_1.default).transaction.update({
            where: { id: transactionId },
            data: { status },
        });
    }
}
exports.default = new TransactionService();
//# sourceMappingURL=transaction.service.js.map