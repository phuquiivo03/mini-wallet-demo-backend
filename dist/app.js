"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
require("dotenv/config");
require("./workers");
const middlewares_1 = require("./shared/middlewares");
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./shared/middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-token"],
    credentials: true,
}));
app.use(middlewares_1.requestIdMiddleware);
app.use(middlewares_1.requestLogger);
app.use(router_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map