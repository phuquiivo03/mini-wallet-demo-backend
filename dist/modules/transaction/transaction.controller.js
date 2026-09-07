"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryByUser = exports.transfer = void 0;
const job_service_1 = __importDefault(require("../job/job.service"));
const transaction_helper_1 = __importDefault(require("./transaction.helper"));
const constants_1 = require("../../infrastructure/rabbitmq/constants");
const errors_1 = require("../../shared/errors");
const errorCode_1 = require("../../shared/errors/errorCode");
const entry_service_1 = __importDefault(require("../entry/entry.service"));
const response_1 = require("../../pkg/app/response");
const transfer = async (req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    const data = req.body;
    await transaction_helper_1.default.validTRansfer(data);
    const job = await job_service_1.default.createAnndPublish({
        action: constants_1.MQActions.TRANSFER,
        data: data,
    });
    customExpress.response200(job);
};
exports.transfer = transfer;
const getHistoryByUser = async (req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    try {
        const queryParams = JSON.parse(req.query.options) || {
            page: 1,
            limit: 10,
        };
        const user = req.user;
        if (!user) {
            throw new errors_1.AppError(errors_1.ErrorCodes.BAD_REQUEST, errors_1.ErrorMessages.UN_AUTHORISED, errorCode_1.ErrorStatusCode.BAD_REQUEST);
        }
        const findOptions = {
            where: {
                account: {
                    userId: user.id,
                },
            },
            skip: (queryParams.page - 1) * queryParams.limit,
            take: queryParams.limit,
            orderBy: {
                createdAt: "desc",
            },
        };
        const entries = await entry_service_1.default.findMany(findOptions);
        customExpress.response200(entries);
    }
    catch (e) {
        throw new errors_1.AppError(errors_1.ErrorCodes.INTERNAL_SERVER_ERROR, e.message, errorCode_1.ErrorStatusCode.INTERNAL_SERVER_ERROR);
    }
};
exports.getHistoryByUser = getHistoryByUser;
//# sourceMappingURL=transaction.controller.js.map