"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishMessage = publishMessage;
const constants_1 = require("./constants");
const connect_1 = require("./connect");
async function publishMessage(routingKey, message, properties) {
    const channel = await (0, connect_1.connectQueue)();
    channel.publish(constants_1.QueueName.EXCHANGE, routingKey, Buffer.from(message), { persistent: true, ...properties });
}
//# sourceMappingURL=helper.js.map