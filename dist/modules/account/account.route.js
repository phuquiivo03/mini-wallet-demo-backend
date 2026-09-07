"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controller_1 = require("./account.controller");
const router = (0, express_1.Router)();
router.get("/:userId", (res) => {
    res.status(200).json({ message: "Account route" });
});
router.get("/:accountId/balance", account_controller_1.getAccountBalance);
exports.default = router;
//# sourceMappingURL=account.route.js.map