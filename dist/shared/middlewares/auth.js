"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const errors_1 = require("../errors");
const errorCode_1 = require("../errors/errorCode");
const helper_1 = require("./helper");
const authMiddleware = async (req, res, next) => {
    const authToken = req.headers["x-token"];
    if (!authToken) {
        throw new errors_1.AppError(errors_1.ErrorCodes.BAD_REQUEST, errors_1.ErrorMessages.UN_AUTHORISED, errorCode_1.ErrorStatusCode.UNAUTHORIZED);
    }
    const reqUser = await (0, helper_1.verifyAndGetAuthUser)(authToken);
    req.user = reqUser;
    req.authToken = authToken;
    next();
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map