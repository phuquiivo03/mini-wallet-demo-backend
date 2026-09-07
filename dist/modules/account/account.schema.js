"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountSchema = void 0;
const zod_1 = require("zod");
const transaction_constants_1 = require("../transaction/transaction.constants");
exports.accountSchema = zod_1.z.object({
    id: zod_1.z.string(),
    currency: zod_1.z.enum(transaction_constants_1.CurrencyEnum),
    userId: zod_1.z.string(),
});
//# sourceMappingURL=account.schema.js.map