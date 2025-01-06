import { randomUUID } from "node:crypto";
import { Environment } from "vitest";

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
    console.log("Test")

    return {
      teardown() { },
    }

  },
  transformMode: "web"
}