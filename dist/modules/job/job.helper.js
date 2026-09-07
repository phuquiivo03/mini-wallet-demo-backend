"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../shared/errors");
const Error_1 = require("../../shared/errors/Error");
const job_dto_1 = require("./job.dto");
class JobHelper {
    jobPeding(job) {
        if (!job)
            throw new Error_1.AppError(errors_1.ErrorCodes.FAILED_TO_GET_JOB, errors_1.ErrorMessages.FAILED_TO_GET_JOB);
        switch (job.status) {
            case job_dto_1.JobStatus.PENDING:
                break;
            case job_dto_1.JobStatus.PROCESSING:
                break;
            case job_dto_1.JobStatus.COMPLETED:
                throw new Error_1.AppError(errors_1.ErrorCodes.JOB_IS_COMPLETED, errors_1.ErrorMessages.JOB_IS_COMPLETED);
            case job_dto_1.JobStatus.FAILED:
                throw new Error_1.AppError(errors_1.ErrorCodes.JOB_IS_FAILED, errors_1.ErrorMessages.JOB_IS_FAILED);
            default:
                throw new Error_1.AppError(errors_1.ErrorCodes.UNDEFINED_JOB, errors_1.ErrorMessages.UNDEFINED_JOB);
        }
    }
}
exports.default = new JobHelper();
//# sourceMappingURL=job.helper.js.map