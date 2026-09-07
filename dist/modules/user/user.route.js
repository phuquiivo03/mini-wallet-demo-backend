"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const user_schema_1 = require("./user.schema");
const middlewares_1 = require("../../shared/middlewares");
const router = (0, express_1.Router)();
router.post("/", (0, middlewares_1.validate)(user_schema_1.createUserSchema), user_controller_1.createUser);
router.get("/", user_controller_1.findAll);
router.get("/:id", user_controller_1.getUser);
router.patch("/:id", user_controller_1.updateUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map