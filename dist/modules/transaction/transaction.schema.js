"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEntrySchema = exports.EntrySchema = exports.TransactionSchema = exports.transferSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const errorMessage_1 = require("../../shared/errors/errorMessage");
const transaction_constants_1 = require("./transaction.constants");
const requiredOrInvalid = (requiredMessage, invalidMessage) => (issue) => issue.input === undefined ? requiredMessage : invalidMessage;
exports.transferSchema = zod_1.z.object({
    fromUserId: zod_1.z.string({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.TRANSFER_FROM_USER_ID_REQUIRED, errorMessage_1.ErrorMessages.TRANSFER_FROM_USER_ID_INVALID),
    }),
    toUserId: zod_1.z.string({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.TRANSFER_TO_USER_ID_REQUIRED, errorMessage_1.ErrorMessages.TRANSFER_TO_USER_ID_INVALID),
    }),
    amount: zod_1.z.number({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.TRANSFER_AMOUNT_REQUIRED, errorMessage_1.ErrorMessages.TRANSFER_AMOUNT_INVALID),
    }),
    currency: zod_1.z
        .string({
        error: errorMessage_1.ErrorMessages.TRANSFER_CURRENCY_INVALID,
    })
        .default("VND"),
    message: zod_1.z
        .string({
        error: errorMessage_1.ErrorMessages.TRANSFER_MESSAGE_INVALID,
    })
        .optional(),
});
exports.TransactionSchema = zod_1.z.object({
    id: zod_1.z.string({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.TRANSACTION_ID_REQUIRED, errorMessage_1.ErrorMessages.TRANSACTION_ID_INVALID),
    }),
    type: zod_1.z.enum(["transfer", "deposit", "withdraw"], {
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.TRANSACTION_TYPE_REQUIRED, errorMessage_1.ErrorMessages.TRANSACTION_TYPE_INVALID),
    }),
    status: zod_1.z.enum([
        transaction_constants_1.TransactionStatus.PENDING,
        transaction_constants_1.TransactionStatus.COMPLETED,
        transaction_constants_1.TransactionStatus.FAILED,
    ], {
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.TRANSACTION_STATUS_REQUIRED, errorMessage_1.ErrorMessages.TRANSACTION_STATUS_INVALID),
    }),
    message: zod_1.z
        .string({
        error: errorMessage_1.ErrorMessages.TRANSACTION_MESSAGE_INVALID,
    })
        .optional(),
    createdAt: zod_1.z.date({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.TRANSACTION_CREATED_AT_REQUIRED, errorMessage_1.ErrorMessages.TRANSACTION_CREATED_AT_INVALID),
    }),
    updatedAt: zod_1.z.date({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.TRANSACTION_UPDATED_AT_REQUIRED, errorMessage_1.ErrorMessages.TRANSACTION_UPDATED_AT_INVALID),
    }),
});
exports.EntrySchema = zod_1.z.object({
    id: zod_1.z.string({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.ENTRY_ID_REQUIRED, errorMessage_1.ErrorMessages.ENTRY_ID_INVALID),
    }),
    transactionId: zod_1.z.string({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.ENTRY_TRANSACTION_ID_REQUIRED, errorMessage_1.ErrorMessages.ENTRY_TRANSACTION_ID_INVALID),
    }),
    accountId: zod_1.z.string({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.ENTRY_ACCOUNT_ID_REQUIRED, errorMessage_1.ErrorMessages.ENTRY_ACCOUNT_ID_INVALID),
    }),
    amount: zod_1.z.union([
        zod_1.z
            .string()
            .refine((val) => !isNaN(Number(val)), {
            message: errorMessage_1.ErrorMessages.ENTRY_AMOUNT_INVALID,
        })
            .transform((val) => client_1.Prisma.Decimal(val)),
        zod_1.z.instanceof(client_1.Prisma.Decimal, {
            error: errorMessage_1.ErrorMessages.ENTRY_AMOUNT_INVALID,
        }),
    ], {
        error: errorMessage_1.ErrorMessages.ENTRY_AMOUNT_INVALID,
    }),
    role: zod_1.z.union([zod_1.z.literal(transaction_constants_1.TransferRoles.SENDER), zod_1.z.literal(transaction_constants_1.TransferRoles.RECEIVER)], {
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.ENTRY_ROLE_REQUIRED, errorMessage_1.ErrorMessages.ENTRY_ROLE_INVALID),
    }),
    createdAt: zod_1.z.date({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.ENTRY_CREATED_AT_REQUIRED, errorMessage_1.ErrorMessages.ENTRY_CREATED_AT_INVALID),
    }),
    updatedAt: zod_1.z.date({
        error: requiredOrInvalid(errorMessage_1.ErrorMessages.ENTRY_UPDATED_AT_REQUIRED, errorMessage_1.ErrorMessages.ENTRY_UPDATED_AT_INVALID),
    }),
});
exports.CreateEntrySchema = exports.EntrySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
//# sourceMappingURL=transaction.schema.js.map