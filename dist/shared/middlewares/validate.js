"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const errors_1 = require("../errors");
const validate = (schema) => {
    return (req, res, next) => {
        try {
            const parseResult = schema.safeParse(req.body);
            if (!parseResult.success) {
                return res.status(400).json({
                    status: false,
                    message: errors_1.ErrorMessages.FAILED_TO_PARSE_DATA,
                    errors: parseResult.error.issues.map((error) => error.message),
                });
            }
            return next();
        }
        catch (error) {
            return next(error);
        }
    };
};
exports.validate = validate;
//# sourceMappingURL=validate.js.map