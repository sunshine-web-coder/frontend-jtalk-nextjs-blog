const { PrismaClient } = require("@prisma/client");

const prismaClientSingleton = () => {
  return new PrismaClient();
};

const globalForPrisma = globalThis;

globalForPrisma.prisma = globalForPrisma.prisma ?? prismaClientSingleton();

const prisma = globalForPrisma.prisma;

module.exports = prisma;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
