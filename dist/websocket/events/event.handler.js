"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventHandler = void 0;
const event_const_1 = require("./event.const");
const sendNotification = async (socket) => {
    socket.send(JSON.stringify({
        event: event_const_1.EVENT_CODE.SEND_NOTIFICATION,
        data: {
            title: "Notification",
            description: "Received new notification",
        },
    }));
};
exports.eventHandler = {
    [event_const_1.EVENT_CODE.SEND_NOTIFICATION]: sendNotification,
};
//# sourceMappingURL=event.handler.js.map