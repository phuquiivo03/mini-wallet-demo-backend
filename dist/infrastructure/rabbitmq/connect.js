"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectQueue = connectQueue;
const amqplib_1 = __importDefault(require("amqplib"));
const constants_1 = require("./constants");
const config_1 = require("../../config");
var channel;
async function connectQueue() {
    if (channel)
        return channel;
    const conn = await amqplib_1.default.connect(config_1.appConfig.rabbitmqUrl);
    channel = await conn.createChannel();
    channel.prefetch(1);
    await channel.assertExchange(constants_1.QueueName.EXCHANGE, "direct", { durable: true });
    await channel.assertExchange(constants_1.QueueName.DLX, "direct", { durable: true });
    await queueFactory(channel, constants_1.QueueName.DLQ, constants_1.RoutingKey.DLQ, { durable: true });
    await queueFactory(channel, constants_1.QueueName.RESIZE, constants_1.RoutingKey.RESIZE, {
        durable: true,
        deadLetterExchange: constants_1.QueueName.DLX,
        deadLetterRoutingKey: constants_1.RoutingKey.DLQ,
    });
    await queueFactory(channel, constants_1.QueueName.WEB3, constants_1.RoutingKey.MINT, {
        durable: true,
        deadLetterExchange: constants_1.QueueName.DLX,
        deadLetterRoutingKey: constants_1.RoutingKey.DLQ,
    });
    await queueFactory(channel, constants_1.QueueName.TRANSACTION, constants_1.RoutingKey.TRANSFER, {
        durable: true,
        deadLetterExchange: constants_1.QueueName.DLX,
        deadLetterRoutingKey: constants_1.RoutingKey.DLQ,
    });
    await channel.assertQueue(constants_1.QueueName.MINT_RETRY, {
        durable: true,
        messageTtl: 5000,
        deadLetterExchange: constants_1.QueueName.EXCHANGE,
        deadLetterRoutingKey: constants_1.RoutingKey.MINT,
    });
    await channel.assertQueue(constants_1.QueueName.RESIZE_RETRY, {
        durable: true,
        messageTtl: 5000,
        deadLetterExchange: constants_1.QueueName.EXCHANGE,
        deadLetterRoutingKey: constants_1.RoutingKey.RESIZE,
    });
    await channel.assertQueue(constants_1.QueueName.TRANSFER_RETRY, {
        durable: true,
        messageTtl: 5000,
        deadLetterExchange: constants_1.QueueName.EXCHANGE,
        deadLetterRoutingKey: constants_1.RoutingKey.TRANSFER,
    });
    return channel;
}
async function queueFactory(channel, queueName, routingKey, options) {
    await channel.assertQueue(queueName, options);
    await channel.bindQueue(queueName, constants_1.QueueName.EXCHANGE, routingKey);
}
//# sourceMappingURL=connect.js.map