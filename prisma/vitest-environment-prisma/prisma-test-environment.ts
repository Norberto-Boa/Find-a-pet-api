import "dotenv/config";

import { randomUUID } from "node:crypto";
import { execSync } from "node:child_process";
import { Environment } from "vitest";
import { prisma } from "@/lib/prisma";

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("No DATABASE_URL environment variable found.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  async setup() {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);
    execSync('npx prisma migrate deploy');

    process.env.DATABASE_URL = databaseURL;

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
      },
    }

  },
  transformMode: "web"
}