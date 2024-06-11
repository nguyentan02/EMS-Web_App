const { PrismaClient } = require("@prisma/client");
const ApiRes = require("../utils/api-res");
const cron = require("node-cron");
const prisma = new PrismaClient();

class HistoryService {}
module.exports = HistoryService;
