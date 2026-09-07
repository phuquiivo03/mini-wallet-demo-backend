"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const connect_1 = __importDefault(require("../../infrastructure/prisma/connect"));
const job_dto_1 = require("./job.dto");
const errorMessage_1 = require("../../shared/errors/errorMessage");
const job_schema_1 = require("./job.schema");
const utils_1 = require("../../utils");
const helper_1 = require("../../infrastructure/rabbitmq/helper");
class JobService {
    async create(data) {
        try {
            const createdJob = await connect_1.default.job.create({
                data: {
                    data: (data.data || {}),
                    action: data.action,
                    status: data.status || job_dto_1.JobStatus.PENDING,
                },
            });
            return (0, utils_1.parseOrThrow)(job_schema_1.jobSchema, createdJob);
        }
        catch (error) {
            throw new Error(errorMessage_1.ErrorMessages.FAILED_TO_CREATE_JOB);
        }
    }
    async find(id) {
        const job = await connect_1.default.job.findUnique({
            where: { id },
        });
        return (0, utils_1.parseOrThrow)(job_schema_1.jobSchema, job);
    }
    async createAnndPublish(data) {
        try {
            const createdJob = await connect_1.default.job.create({
                data: {
                    data: (data.data || {}),
                    action: data.action,
                    status: data.status || job_dto_1.JobStatus.PENDING,
                },
            });
            await (0, helper_1.publishMessage)(data.action, JSON.stringify(createdJob));
            return (0, utils_1.parseOrThrow)(job_schema_1.jobSchema, createdJob);
        }
        catch (error) {
            console.error("Error in createAnndPublish", error.message);
            throw new Error(errorMessage_1.ErrorMessages.FAILED_TO_CREATE_JOB);
        }
    }
    async get(jobId) {
        try {
            const result = await connect_1.default.job.findUnique({
                where: { id: jobId },
            });
            return (0, utils_1.parseOrThrow)(job_schema_1.jobSchema, result);
        }
        catch (error) {
            if (error.message === errorMessage_1.ErrorMessages.FAILED_TO_PARSE_DATA)
                throw error;
            throw new Error(errorMessage_1.ErrorMessages.FAILED_TO_GET_JOB);
        }
    }
    async update(jobId, status, tx) {
        await (tx || connect_1.default).job.update({
            where: { id: jobId },
            data: { status },
        });
    }
    async updateAndCount(jobId, status) {
        const updatedJob = await connect_1.default.job.updateMany({
            where: { id: jobId, status: job_dto_1.JobStatus.PENDING },
            data: { status },
        });
        return updatedJob.count;
    }
}
exports.JobService = JobService;
exports.default = new JobService();
//# sourceMappingURL=job.service.js.map