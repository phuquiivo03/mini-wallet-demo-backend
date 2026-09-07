"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const job_controller_1 = require("./job.controller");
const router = (0, express_1.Router)();
router.get("/:id", job_controller_1.getJobById);
exports.default = router;
//# sourceMappingURL=job.route.js.map