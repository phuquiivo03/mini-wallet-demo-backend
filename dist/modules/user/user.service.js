"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../../infrastructure/prisma/connect"));
const utils_1 = require("../../utils");
const user_schema_1 = require("./user.schema");
const errorMessage_1 = require("../../shared/errors/errorMessage");
const transaction_1 = require("../transaction");
const hashing_1 = require("../../utils/hashing");
class UserService {
    async createUser(input) {
        try {
            const hashedPassword = await (0, hashing_1.hash)(input.password);
            const user = await connect_1.default.user.create({
                data: {
                    name: input.name,
                    password: hashedPassword,
                    phoneNumber: input.phoneNumber,
                    email: "",
                    account: {
                        create: {
                            currency: transaction_1.defaultCurrency.symbol,
                        },
                    },
                },
                include: { account: true },
            });
            if (!user) {
                throw new Error(errorMessage_1.ErrorMessages.FAILED_TO_CREATE_USER);
            }
            return (0, utils_1.parseOrThrow)(user_schema_1.userSchema, user);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getUser(userId) {
        return connect_1.default.user.findUnique({
            where: { id: userId },
            include: { account: true },
        });
    }
    async find(filter) {
        return connect_1.default.user.findFirst({
            where: filter,
            include: { account: true },
        });
    }
    async findAll(options) {
        return connect_1.default.user.findMany(options);
    }
    async updateUser(userId, input) {
        const userData = {
            ...(input.name !== undefined ? { name: input.name } : {}),
            ...(input.email !== undefined ? { email: input.email } : {}),
            ...(input.password !== undefined ? { password: input.password } : {}),
        };
        await connect_1.default.user.update({
            where: { id: userId },
            data: userData,
        });
        return this.getUser(userId);
    }
    async createAccount(userId, currency) {
        return connect_1.default.account.create({
            data: {
                userId,
                currency: currency || transaction_1.defaultCurrency.symbol,
            },
        });
    }
    async getAccount(userId) {
        return connect_1.default.account.findUnique({
            where: { userId },
        });
    }
    async updateAccount(userId, currency) {
        return connect_1.default.account.update({
            where: { userId },
            data: { currency },
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=user.service.js.map