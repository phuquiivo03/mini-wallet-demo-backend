"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnection = void 0;
const connection_manager_1 = __importDefault(require("./connection.manager"));
const route_1 = require("../route");
const handleConnection = async (wss, user, request) => {
    connection_manager_1.default.add(user.id, wss);
    wss.on("message", (data) => {
        const message = JSON.parse(data.toString());
        const handler = route_1.websocketRoute[message.event];
        if (!handler)
            return;
        handler(wss, user, message);
    });
    wss.on("close", () => {
        connection_manager_1.default.remove(user.id);
    });
};
exports.handleConnection = handleConnection;
//# sourceMappingURL=connection.handlers.js.map