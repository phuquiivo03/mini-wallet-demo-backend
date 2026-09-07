"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../../infrastructure/prisma/connect"));
const utils_1 = require("../../utils");
const transaction_1 = require("../transaction");
const client_1 = require("@prisma/client");
class EntryService {
    async create(data, tx) {
        const entry = await (tx || connect_1.default).entry.create({
            data: {
                ...data,
            },
        });
        return (0, utils_1.parseOrThrow)(transaction_1.EntrySchema, entry);
    }
    async createMany(data, tx) {
        const entries = await (tx || connect_1.default).entry.createMany({
            data,
        });
        return entries.count;
    }
    async get(entryId) {
        const entry = await connect_1.default.entry.findUnique({
            where: { id: entryId },
        });
        return (0, utils_1.parseOrThrow)(transaction_1.EntrySchema, entry);
    }
    async getEntriesByAccountId(accountId) {
        const entries = await connect_1.default.entry.findMany({
            where: { accountId },
        });
        return (0, utils_1.parseOrThrow)(transaction_1.EntrySchema.array(), entries);
    }
    async getBalanceByAccountId(accountId) {
        const result = await this.getEntriesByAccountId(accountId);
        return result.reduce((acc, entry) => acc.add(entry.amount), client_1.Prisma.Decimal("0"));
    }
    async findMany(options) {
        return connect_1.default.entry.findMany(options);
    }
}
exports.default = new EntryService();
//# sourceMappingURL=entry.service.js.map