import { PrismaClient } from "@prisma/client";
import invariant from "tiny-invariant";

const { DATABASE_URL } = process.env;
invariant(typeof DATABASE_URL === "string", "DATABASE_URL env var not set");

const databaseUrl = new URL(DATABASE_URL);

console.log(`🔌 setting up prisma client to ${databaseUrl.host}`);

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl.toString(),
      },
    },
  });
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl.toString(),
        },
      },
    });
  }
  prisma = (global as any).prisma;
}

export default prisma;
