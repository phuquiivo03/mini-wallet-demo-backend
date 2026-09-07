"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountBalance = void 0;
const entry_service_1 = __importDefault(require("../entry/entry.service"));
const utils_1 = require("../../utils");
const account_service_1 = __importDefault(require("./account.service"));
const response_1 = require("../../pkg/app/response");
const getAccountBalance = async (req, res, next) => {
    try {
        const customExpress = new response_1.CustomExpress(req, res, next);
        const accountId = req.params.accountId;
        if (!accountId) {
            throw new Error("User ID is required!");
        }
        const account = await account_service_1.default.findById(accountId);
        if (!account) {
            throw new Error("Account not found!");
        }
        const balance = await entry_service_1.default.getBalanceByAccountId(accountId);
        const displayBalance = (0, utils_1.convertMoney)(balance, account.currency);
        return customExpress.response200({
            balance: displayBalance,
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
exports.getAccountBalance = getAccountBalance;
//# sourceMappingURL=account.controller.js.map