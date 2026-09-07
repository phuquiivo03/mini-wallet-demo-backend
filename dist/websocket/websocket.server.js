"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupWebSocket = void 0;
const ws_1 = require("ws");
const connection_handlers_1 = require("./connection/connection.handlers");
const auth_1 = require("./middleware/auth");
const setupWebSocket = (server) => {
    const wss = new ws_1.WebSocketServer({
        noServer: true,
    });
    server.on("upgrade", async (request, socket, head) => {
        try {
            const userData = await (0, auth_1.authenSocketConnection)(request);
            wss.handleUpgrade(request, socket, head, (ws) => {
                (0, connection_handlers_1.handleConnection)(ws, userData, request);
            });
        }
        catch (error) {
            socket.destroy();
        }
    });
};
exports.setupWebSocket = setupWebSocket;
//# sourceMappingURL=websocket.server.js.map