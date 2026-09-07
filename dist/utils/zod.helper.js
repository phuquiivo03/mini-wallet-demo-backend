"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseOrThrow = parseOrThrow;
const errorMessage_1 = require("../shared/errors/errorMessage");
const errors_1 = require("../shared/errors");
const errorCode_1 = require("../shared/errors/errorCode");
function parseOrThrow(schema, data) {
    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
        throw new errors_1.AppError(errorMessage_1.ErrorMessages.FAILED_TO_PARSE_DATA, `${parseResult.error.issues.map((error) => error.message)}`, errorCode_1.ErrorStatusCode.BAD_REQUEST);
    }
    return parseResult.data;
}
//# sourceMappingURL=zod.helper.js.map