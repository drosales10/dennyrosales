import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent creating too many Prisma clients during hot-reload in dev.
  var prismaGlobal: PrismaClient | undefined;
}

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL no esta definida. Configura .env en la raiz del proyecto antes de iniciar la app.");
}

const adapter = new PrismaPg(databaseUrl);

export const prisma =
  globalThis.prismaGlobal ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
