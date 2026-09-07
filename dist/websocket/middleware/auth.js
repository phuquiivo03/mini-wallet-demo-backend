"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenSocketConnection = void 0;
const helper_1 = require("../../shared/middlewares/helper");
const errors_1 = require("../../shared/errors");
const authenSocketConnection = async (request) => {
    const host = request.headers.host;
    const fullUrl = `http://${host}${request.url}`;
    const { searchParams } = new URL(fullUrl);
    const authToken = searchParams.get("authToken");
    if (!authToken) {
        throw new errors_1.AppError(errors_1.ErrorCodes.BAD_REQUEST, errors_1.ErrorMessages.UN_AUTHORISED);
    }
    const authUser = await (0, helper_1.verifyAndGetAuthUser)(authToken);
    return authUser;
};
exports.authenSocketConnection = authenSocketConnection;
//# sourceMappingURL=auth.js.map