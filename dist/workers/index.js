"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transfer_1 = require("./transfer");
const startWorker = () => {
    (0, transfer_1.transferWorker)();
    console.log("Worker started");
};
startWorker();
//# sourceMappingURL=index.js.map