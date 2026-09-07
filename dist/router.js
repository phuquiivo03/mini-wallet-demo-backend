"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("./modules/user/user.route"));
const transaction_route_1 = __importDefault(require("./modules/transaction/transaction.route"));
const account_route_1 = __importDefault(require("./modules/account/account.route"));
const job_route_1 = __importDefault(require("./modules/job/job.route"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const router = (0, express_1.Router)();
router.use("/users", user_route_1.default);
router.use("/transactions", transaction_route_1.default);
router.use("/accounts", account_route_1.default);
router.use("/jobs", job_route_1.default);
router.use("/auth", auth_route_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map