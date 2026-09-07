"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionManager = void 0;
const ws_1 = __importDefault(require("ws"));
class ConnectionManager {
    connections = new Map();
    add(id, socket) {
        this.connections.set(id, socket);
    }
    remove(id) {
        this.connections.delete(id);
    }
    has(id) {
        return this.connections.has(id);
    }
    get(id) {
        return this.connections.get(id);
    }
    send(id, message) {
        const socket = this.connections.get(id);
        if (!socket) {
            return;
        }
        if (socket.readyState !== ws_1.default.OPEN) {
            return;
        }
        socket.send(JSON.stringify(message));
    }
}
exports.ConnectionManager = ConnectionManager;
exports.default = new ConnectionManager();
//# sourceMappingURL=connection.manager.js.map