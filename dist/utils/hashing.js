"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compare = exports.hash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hash = async (plaintext) => {
    return await bcrypt_1.default.hash(plaintext, 10);
};
exports.hash = hash;
const compare = async (plaintext, currentHashed) => {
    return await bcrypt_1.default.compare(plaintext, currentHashed);
};
exports.compare = compare;
//# sourceMappingURL=hashing.js.map