"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAndGetAuthUser = void 0;
const jwt_1 = __importDefault(require("../../utils/jwt"));
const auth_1 = require("../types/auth");
const errors_1 = require("../errors");
const errorCode_1 = require("../errors/errorCode");
const user_service_1 = __importDefault(require("../../modules/user/user.service"));
const connect_1 = __importDefault(require("../../infrastructure/redis/connect"));
const config_1 = require("../../config");
const verifyAndGetAuthUser = async (authToken) => {
    const redisClient = await connect_1.default;
    const blacklistToken = await redisClient.get(config_1.appConfig.redis.key.authToken(authToken));
    if (blacklistToken !== null) {
        throw new errors_1.AppError(errors_1.ErrorCodes.BAD_REQUEST, errors_1.ErrorMessages.UN_AUTHORISED, errorCode_1.ErrorStatusCode.UNAUTHORIZED);
    }
    const authenData = jwt_1.default.parseToken(authToken, auth_1.AuthJWTSchema);
    const user = await user_service_1.default.find({
        id: authenData.id,
    });
    if (!user) {
        throw new errors_1.AppError(errors_1.ErrorCodes.BAD_REQUEST, errors_1.ErrorMessages.UN_AUTHORISED, errorCode_1.ErrorStatusCode.UNAUTHORIZED);
    }
    const { password, account, ...reqUser } = user;
    return reqUser;
};
exports.verifyAndGetAuthUser = verifyAndGetAuthUser;
//# sourceMappingURL=helper.js.map