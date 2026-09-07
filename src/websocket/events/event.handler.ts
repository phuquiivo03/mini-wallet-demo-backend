import WebSocket from "ws";
import { EventType, MessageHandler } from "../types";
import { EVENT_CODE } from "./event.const";

const sendNotification = async (socket: WebSocket) => {
  socket.send(
    JSON.stringify({
      event: EVENT_CODE.SEND_NOTIFICATION,
      data: {
        title: "Notification",
        description: "Received new notification",
      },
    }),
  );
};

export const eventHandler: Record<EventType, MessageHandler> = {
  [EVENT_CODE.SEND_NOTIFICATION]: sendNotification,
};
