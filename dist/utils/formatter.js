"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMoney = void 0;
const client_1 = require("@prisma/client/runtime/client");
const transaction_1 = require("../modules/transaction");
const convertMoney = (amount, currencySymbol) => {
    if (!(amount instanceof client_1.Decimal)) {
        amount = (0, client_1.Decimal)(amount);
    }
    const currency = transaction_1.currencies[currencySymbol];
    const formattedAmount = amount
        .div(currency.breakdown)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedAmount}`;
};
exports.convertMoney = convertMoney;
//# sourceMappingURL=formatter.js.map