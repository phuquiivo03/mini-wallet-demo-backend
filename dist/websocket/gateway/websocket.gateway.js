"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_manager_1 = __importDefault(require("../connection/connection.manager"));
const events_1 = require("../events");
class WebSocketGateway {
    connectionManager;
    constructor(connectionManager) {
        this.connectionManager = connectionManager;
    }
    sendNotification(userId, data) {
        const jsonData = JSON.parse(data);
        const message = JSON.stringify({
            data: jsonData,
            event: events_1.EVENT_CODE.SEND_NOTIFICATION,
        });
        this.connectionManager.send(userId, message);
    }
}
exports.default = new WebSocketGateway(connection_manager_1.default);
//# sourceMappingURL=websocket.gateway.js.map