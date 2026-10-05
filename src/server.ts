import http from "http";
import app from "./app";
import { setupWebSocket } from "./websocket";

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

setupWebSocket(server);

server.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
  console.log(`API docs available at http://localhost:${PORT}/api-docs`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});
