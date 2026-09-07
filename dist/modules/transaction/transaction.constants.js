"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionStatus = exports.defaultCurrency = exports.TransferRoles = exports.currencies = exports.CurrencyEnum = void 0;
var CurrencyEnum;
(function (CurrencyEnum) {
    CurrencyEnum["VND"] = "VND";
    CurrencyEnum["USD"] = "USD";
})(CurrencyEnum || (exports.CurrencyEnum = CurrencyEnum = {}));
exports.currencies = {
    VND: {
        name: "Vietnamese Dong",
        symbol: "VND",
        breakdown: 1,
    },
    USD: {
        name: "United States Dollar",
        symbol: "USD",
        breakdown: 100,
    },
};
exports.TransferRoles = {
    RECEIVER: "receiver",
    SENDER: "sender",
};
exports.defaultCurrency = exports.currencies.VND;
exports.TransactionStatus = {
    PENDING: "pending",
    COMPLETED: "completed",
    FAILED: "failed",
};
//# sourceMappingURL=transaction.constants.js.map