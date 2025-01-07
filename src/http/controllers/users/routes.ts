import type { FastifyInstance } from "fastify";
import { register } from "./register.controller";
import { authentication } from "./authentication.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', register);
  app.post('/auth', authentication);
}