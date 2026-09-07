"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.findAll = exports.getUser = exports.createUser = void 0;
const user_service_1 = __importDefault(require("./user.service"));
const user_service_2 = __importDefault(require("./user.service"));
const response_1 = require("../../pkg/app/response");
const errorCode_1 = require("../../shared/errors/errorCode");
const createUser = async (req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    try {
        const data = req.body;
        const result = await user_service_1.default.createUser(data);
        customExpress.response201(result);
    }
    catch (error) {
        customExpress.response400(errorCode_1.ErrorStatusCode.BAD_GATEWAY, error);
    }
};
exports.createUser = createUser;
const getUser = async (req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    try {
        const result = await user_service_1.default.getUser(req.params.id);
        if (!result) {
            customExpress.response404(errorCode_1.ErrorStatusCode.NOT_FOUND, {
                reason: "User not found",
            });
        }
        return res.json({ data: result });
    }
    catch (error) {
        return customExpress.response400(errorCode_1.ErrorStatusCode.BAD_REQUEST, error);
    }
};
exports.getUser = getUser;
const findAll = async (req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    const options = JSON.parse(req.query.options);
    const users = await user_service_2.default.findAll(options);
    return customExpress.response200(users);
};
exports.findAll = findAll;
const updateUser = async (req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    try {
        const result = await user_service_1.default.updateUser(req.params.id, req.body);
        customExpress.response200(result);
    }
    catch (error) {
        customExpress.response400(errorCode_1.ErrorStatusCode.BAD_REQUEST, error);
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.controller.js.map