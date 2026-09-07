"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
require("dotenv/config");
const transaction_1 = require("../modules/transaction");
const redis = {
    username: process.env.REDIS_USERNAME || "",
    password: process.env.REDIS_PASSWORD || "",
    host: process.env.REDIS_HOST || "",
    port: process.env.REDIS_PORT || "",
    expiration: (parseInt(process.env.REDIS_REFESH_TOKEN_EXPIRATION || "1") || 1) *
        24 *
        3600,
    authExpiration: (parseInt(process.env.REDIS_AUTH_TOKEN_EXPIRATION || "1") || 1) * 24 * 3600,
    key: {
        refeshToken: (id) => `refesh_auth_token_${id}`,
        authToken: (id) => `auth_token_${id}`,
    },
};
const jwt = {
    auth: {
        secret: process.env.JWT_SECRET || "",
        expiresIn: process.env.JWT_EXPIRE || "24h",
        refeshExpires: process.env.JWT_REFESG_EXPIRE || "30d",
    },
};
exports.appConfig = {
    port: process.env.PORT || "3000",
    databaseUrl: process.env.DATABASE_URL || "",
    rabbitmqUrl: process.env.RABBITMQ_URL || "",
    currencies: transaction_1.currencies,
    jwt,
    redis,
};
//# sourceMappingURL=app.config.js.map