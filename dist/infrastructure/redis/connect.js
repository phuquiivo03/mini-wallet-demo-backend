"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const config_1 = require("../../config/");
const client = (0, redis_1.createClient)({
    socket: {
        host: config_1.appConfig.redis.host,
        port: parseInt(config_1.appConfig.redis.port),
    },
    username: config_1.appConfig.redis.username,
    password: config_1.appConfig.redis.password,
})
    .on("error", (err) => console.log("Redis Client Error", err.message))
    .connect();
exports.default = client;
//# sourceMappingURL=connect.js.map