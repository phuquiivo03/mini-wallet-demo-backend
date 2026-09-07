"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobById = void 0;
const response_1 = require("../../pkg/app/response");
const errorCode_1 = require("../../shared/errors/errorCode");
const job_service_1 = __importDefault(require("./job.service"));
const getJobById = async (req, res, next) => {
    const customExpress = new response_1.CustomExpress(req, res, next);
    try {
        const { id } = req.params;
        const job = await job_service_1.default.find(id);
        customExpress.response200({ data: job });
    }
    catch (error) {
        customExpress.response500(errorCode_1.ErrorStatusCode.INTERNAL_SERVER_ERROR, {
            message: "Failed to get job",
            error,
        });
    }
};
exports.getJobById = getJobById;
//# sourceMappingURL=job.controller.js.map