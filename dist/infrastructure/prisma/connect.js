"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const config_1 = require("../../config");
const connectionString = config_1.dbConfig.databaseUrl;
const pool = new pg_1.Pool({ connectionString });
const adapter = new adapter_pg_1.PrismaPg(pool);
const prisma = new client_1.PrismaClient({ adapter });
async function connectDB() {
    await prisma.$connect();
}
connectDB()
    .then(() => {
    console.log("Connected to database");
})
    .catch((err) => {
    console.error("Error connecting to database", err);
});
exports.default = prisma;
//# sourceMappingURL=connect.js.map