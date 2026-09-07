"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_schema_1 = require("./auth.schema");
const auth_controller_1 = require("./auth.controller");
const validate_1 = require("../../shared/middlewares/validate");
const errorHandler_1 = require("../../shared/middlewares/errorHandler");
const auth_1 = require("../../shared/middlewares/auth");
const router = (0, express_1.Router)();
router.post("/login", (0, validate_1.validate)(auth_schema_1.loginSchema), (0, errorHandler_1.asyncHandler)(auth_controller_1.login));
router.post("/logout", auth_1.authMiddleware, (0, errorHandler_1.asyncHandler)(auth_controller_1.logout));
exports.default = router;
//# sourceMappingURL=auth.route.js.map