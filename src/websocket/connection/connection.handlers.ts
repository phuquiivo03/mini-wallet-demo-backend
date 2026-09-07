import { RawData, WebSocket } from "ws";
import { RequestUser } from "../../modules/user/user.type";
import connectionManager from "./connection.manager";
import { websocketRoute } from "../route";
import { WebSocketMessage } from "../types";
import { IncomingMessage } from "http";
export const handleConnection = async (
  wss: WebSocket,
  user: RequestUser,
  // @ts-ignore
  request: IncomingMessage,
) => {
  // handle connect
  connectionManager.add(user.id, wss);
  // handle message
  wss.on("message", (data: RawData) => {
    const message = JSON.parse(data.toString()) as WebSocketMessage;
    const handler = websocketRoute[message.event];
    if (!handler) return;
    handler(wss, user, message);
  });
  // handle close
  wss.on("close", () => {
    connectionManager.remove(user.id);
  });
};
