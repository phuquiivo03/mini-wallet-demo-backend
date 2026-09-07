"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobSchema = void 0;
const zod_1 = require("zod");
const constants_1 = require("../../infrastructure/rabbitmq/constants");
const job_dto_1 = require("./job.dto");
exports.jobSchema = zod_1.z.object({
    id: zod_1.z.string(),
    data: zod_1.z.any(),
    action: zod_1.z.enum(Object.values(constants_1.MQActions)),
    status: zod_1.z.enum(Object.values(job_dto_1.JobStatus)),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
//# sourceMappingURL=job.schema.js.map