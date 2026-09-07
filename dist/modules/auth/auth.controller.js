"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const user_service_1 = __importDefault(require("../user/user.service"));
const hashing_1 = require("../../utils/hashing");
const errors_1 = require("../../shared/errors");
const jwt_1 = __importDefault(require("../../utils/jwt"));
const connect_1 = __importDefault(require("../../infrastructure/redis/connect"));
const app_config_1 = require("../../config/app.config");
const errorCode_1 = require("../../shared/errors/errorCode");
const response_1 = require("../../pkg/app/response");
const login = async (req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    try {
        const loginData = req.body;
        const user = await user_service_1.default.find({
            phoneNumber: loginData.phoneNumber,
        });
        if (!user) {
            throw new errors_1.AppError(errors_1.ErrorMessages.INVALID_CREADENTIAL, errors_1.ErrorMessages.INVALID_CREADENTIAL);
        }
        const isMatch = await (0, hashing_1.compare)(loginData.password, user.password);
        if (!isMatch) {
            throw new errors_1.AppError(errors_1.ErrorMessages.INVALID_CREADENTIAL, errors_1.ErrorMessages.INVALID_CREADENTIAL);
        }
        const authenToken = jwt_1.default.generateAuthToken(user.id);
        const refeshToken = jwt_1.default.generateFefeshToken(user.id);
        const redisClient = await connect_1.default;
        await redisClient.del(app_config_1.appConfig.redis.key.refeshToken(user.id));
        await redisClient.set(app_config_1.appConfig.redis.key.refeshToken(user.id), refeshToken, {
            expiration: {
                type: "EX",
                value: app_config_1.appConfig.redis.expiration,
            },
        });
        const { password, ...responseData } = user;
        customExpress.response200({
            ...responseData,
            authenToken,
            refeshToken,
        });
    }
    catch (e) {
        throw new errors_1.AppError(errors_1.ErrorCodes.INTERNAL_SERVER_ERROR, e.message);
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    const authToken = req.authToken;
    const redisClient = await connect_1.default;
    const refeshToken = await redisClient.get(app_config_1.appConfig.redis.key.refeshToken(req.user?.id));
    if (!refeshToken) {
        throw new errors_1.AppError(errors_1.ErrorMessages.BAD_REQUEST, errors_1.ErrorMessages.REFESH_TOKEN_NOTFOUND, errorCode_1.ErrorStatusCode.BAD_REQUEST);
    }
    await Promise.all([
        redisClient.set(app_config_1.appConfig.redis.key.authToken(authToken), "true", {
            expiration: {
                type: "EX",
                value: app_config_1.appConfig.redis.authExpiration,
            },
        }),
        redisClient.del(refeshToken),
    ]);
    customExpress.response200({
        status: "successfull",
    });
};
exports.logout = logout;
//# sourceMappingURL=auth.controller.js.map