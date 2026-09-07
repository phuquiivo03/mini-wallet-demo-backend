"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    email: zod_1.z.union([zod_1.z.string().email(), zod_1.z.literal("")]),
    password: zod_1.z.string(),
    phoneNumber: zod_1.z.string(),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
    account: zod_1.z.object({
        currency: zod_1.z.string(),
    }),
});
exports.createUserSchema = exports.userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    email: true,
    account: true,
});
exports.updateUserSchema = exports.userSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    account: true,
});
//# sourceMappingURL=user.schema.js.map