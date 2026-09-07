"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transaction_controller_1 = require("./transaction.controller");
const validate_1 = require("../../shared/middlewares/validate");
const transaction_schema_1 = require("./transaction.schema");
const errorHandler_1 = require("../../shared/middlewares/errorHandler");
const auth_1 = require("../../shared/middlewares/auth");
const router = (0, express_1.Router)();
router.post("/", (0, validate_1.validate)(transaction_schema_1.transferSchema), (0, errorHandler_1.asyncHandler)(transaction_controller_1.transfer));
router.get("/users", auth_1.authMiddleware, (0, errorHandler_1.asyncHandler)(transaction_controller_1.getHistoryByUser));
exports.default = router;
//# sourceMappingURL=transaction.route.js.map