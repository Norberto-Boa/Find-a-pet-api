import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { create } from "./create.controller";
import { fetch } from "./fetch.controller";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/pet/create", { onRequest: [verifyJWT] }, create);
  app.get("/pet/:id", fetch);
} 